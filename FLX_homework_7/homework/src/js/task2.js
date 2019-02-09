if(confirm("Do you want to play a game?")) {
	let userPlay = true;
	while(userPlay) {
		let maxRange = 5;
		let maxPrize = 10;
		let totalPrize = 0;
		let userContinue = true;
		while(userContinue) {
			let attempts = 3;
			let numRand = Math.round(Math.random() * maxRange);
			console.log(numRand);
			let currentPrize = maxPrize;
			for(attempts; attempts > 0; attempts--) {
				let numUser = prompt("Enter a number from 0 to "+maxRange+
															"\nAttempts left: "+attempts+
															"\nTotal prize: "+totalPrize+
															"\nPossible prize on current attempt: "+currentPrize);
				if(Number.parseFloat(numUser) === numRand) {
					totalPrize += currentPrize;
					if(confirm("Congratulation! Your prize is: "+totalPrize+"\nDo you want to continue?")) {
						maxRange *= 2;
						maxPrize *= 3;
						currentPrize = maxPrize;
						break;
					} else {
						alert("Thank you for a game. Your prize is: "+totalPrize);
						userContinue = false;
						if(confirm("Do you want to play again?")) {
							userPlay = true;
						} else {
							userPlay = false;
						}
						break;
					}
				} else {
					if(attempts === 1) {
						alert("Thank you for a game. Your prize is: "+totalPrize);
						if(confirm("Do you want to play again?")) {
							userPlay = true;
						} else {
							userPlay = false;
						}
						userContinue = false;
					}
				}
				currentPrize = Math.floor(currentPrize/2);
			}
		}
	}
} else {
	alert("You did not become a millionaire, but can.");
}