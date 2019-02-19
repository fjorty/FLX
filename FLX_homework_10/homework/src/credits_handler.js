function userCard(index) {
	const minCredits = 0;
	const card = {
		key: index,
		balance: 100,
		transactionLimit: 100,
		historyLogs: []
	}
	function operationTime() {
		return new Date().toLocaleString('en-GB');
	}
	function historyLogsInfo(operationType, credits, operationTime) {
		card.historyLogs.push({
			operationType: operationType,
			credits: credits,
			operationTime: operationTime
		});
	}
	return {
		getCardOptions() {
			return card;
		},
		putCredits(credits) {
			if(typeof credits === 'number' && 
			credits > minCredits) {
				card.balance += credits;
				historyLogsInfo('Received credits', credits, operationTime());
			} else {
				console.error("You can't put this amount of credits");
			}
		},
		takeCredits(credits) {
			if(typeof credits === 'number' && 
			credits > minCredits && 
			card.transactionLimit >= credits && 
			card.balance >= credits) {
				card.balance -= credits;
				historyLogsInfo('Withdrawal of credits', credits, operationTime());
			} else {
				console.error("You can't take credits from the card!");
			}
		},
		setTransactionLimit(credits) {
			if(typeof credits === 'number' &&
			credits > minCredits) {
				card.transactionLimit = credits;
				historyLogsInfo('Transaction limit change', credits, operationTime());
			} else {
				console.error("You can't set this transaction limit!");
			}
		},
		transferCredits(credits, cardNumber) {
			const tax = 0.005;
			let creditsPlusTax = credits + credits * tax;
			if(typeof credits === 'number' && 
			credits > minCredits && 
			card.transactionLimit >= creditsPlusTax 
			&& card.balance >= creditsPlusTax) {
				this.takeCredits(creditsPlusTax);
				cardNumber.putCredits(credits);
			} else {
				console.error("You can't take credits from the card!");
			}
		}
	}
}
class UserAccount {
	constructor(name) {
		this.name = name;
		this.cards = [];
	}
	addCard() {
		let cardsLength = this.cards.length;
		let maxLength = 3;
		if(cardsLength < maxLength) {
			this.cards.push(userCard(cardsLength + 1));
		} else {
			console.error("You can't add more than three cards!");
		}
	}
	getCardByKey(index) {
		let minIndex = 0;
		let maxIndex = 3;
		if(index > minIndex && index <= maxIndex) {
			return this.cards[index - 1];
		} else {
			console.error("You can't use more than three cards!");
		}
	}
}