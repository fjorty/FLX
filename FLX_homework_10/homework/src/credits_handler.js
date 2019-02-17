function userCard(index) {
	const card = {
		balance: 100,
		transactionLimit: 100,
		historyLogs: [],
		key: index
	}
	function getCardOptions() {
		return this.card;
	}
	function putCredits(credits) {
		this.card.balance += credits;
	}
	function takeCredits(credits) {
		this.card.balance -= credits;
	}
	function setTransactionLimit() {
		// body...
	}
	function transferCredits() {
		// body...
	}
}
