/* Task 1 */
function userCard(index) {
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
			card.balance += credits;
			historyLogsInfo('Received credits', credits, operationTime());
		},
		takeCredits(credits) {
			if(card.transactionLimit >= credits && card.balance >= credits) {
				card.balance -= credits;
				historyLogsInfo('Withdrawal of credits', credits, operationTime());
			} else {
				console.error("You can't take credits from the card!");
			}
		},
		setTransactionLimit(credits) {
			card.transactionLimit = credits;
			historyLogsInfo('Transaction limit change', credits, operationTime());
		},
		transferCredits(credits, index) {
			const tax = 0.005;
			let creditsPlusTax = credits + credits * tax;
			if(card.transactionLimit >= creditsPlusTax && card.balance >= creditsPlusTax) {
				this.takeCredits(creditsPlusTax);
				index.putCredits(credits);
			} else {
				console.error("You can't take credits from the card!");
			}
		}
	}
}
/* Task 2 */
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
		return this.cards[index - 1];
	}
}