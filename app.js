const milesCounter = document.querySelector('#milesInput');
const milesView = document.querySelector('#milesView');
const baseCentsPerMileInput = document.querySelector('#baseCentsPerMileInput');
const centsPerMileView = document.querySelector('#centsPerMileView');
const bonusThresholdView = document.querySelector('#bonusThreshold');
const tenOverTenView = document.querySelector('#tenOverTenView');
const fuelView = document.querySelector('#fuelView');
const idleView = document.querySelector('#idleView');
const totalBonusView = document.querySelector('#totalBonusView');
const bonusCentsPerMileView = document.querySelector('#bonusCentsPerMileView');
const monthlyTotalView = document.querySelector('#monthlyTotalView');
const yearlyTotalView = document.querySelector('#yearlyTotalView');

const fuelCheckBox = document.querySelector('#fuelCheckBox');
const idleCheckBox = document.querySelector('#idleCheckBox');
const dryVanRadio = document.querySelector('#dryVan');
const flatBedRadio = document.querySelector('#flatBed');

let totalMiles = 10000;
let bonusThreshold;
let baseCentsPerMile = 0.36;
const tenOverTenBonusAmount = 0.1;
const fuelBonusAmount = 0.01;
const idleBonusAmount = 0.01;
let basePay = totalMiles * baseCentsPerMile;

flatBedRadio.addEventListener('change', function() {
	bonusThreshold = 9000;
	bonusThresholdView.innerText = `Bonus Threshold: ${bonusThreshold}`;
});
dryVanRadio.addEventListener('change', function() {
	bonusThreshold = 10000;
	bonusThresholdView.innerText = `Bonus Threshold: ${bonusThreshold}`;
});

baseCentsPerMileInput.addEventListener('input', function() {
	baseCentsPerMile = baseCentsPerMileInput.value;
	centsPerMileView.innerText = `Cents Per Mile: $${baseCentsPerMile}`;
});

const calculateBasePay = function(miles) {
	basePay = miles * baseCentsPerMile;
};
const calculateFuelBonus = function(miles) {
	if (miles >= bonusThreshold) {
		totalFuelBonus = miles * fuelBonusAmount;
	} else {
		totalFuelBonus = 0;
	}
};

const calculateIdleBonus = function(miles) {
	if (miles >= bonusThreshold) {
		totalIdleBonus = miles * idleBonusAmount;
	} else {
		totalIdleBonus = 0;
	}
};
const calculateTenOverTenBonus = function(miles) {
	if (miles >= bonusThreshold) {
		totalTenOverTenBonus = (miles - bonusThreshold) * 0.1;
	} else {
		totalTenOverTenBonus = 0;
	}
};

monthlyTotalView.innerText = `$${basePay}`;
yearlyTotalView.innerText = `$${basePay * 12}`;
centsPerMileView.innerText = `Cents Per Mile: $${baseCentsPerMile}`;

milesCounter.addEventListener('input', function() {
	let totalMiles = milesCounter.value;
	milesView.innerText = `Total Miles: ${totalMiles}`;
	calculateBasePay(totalMiles);
	calculateFuelBonus(totalMiles);
	calculateIdleBonus(totalMiles);
	calculateTenOverTenBonus(totalMiles);

	let totalBonus = totalTenOverTenBonus + totalIdleBonus + totalFuelBonus;
	let totalPay = basePay + totalBonus;
	let bonusCentsPerMile = totalBonus / totalMiles;
	monthlyTotalView.innerText = `$${basePay}`;
	yearlyTotalView.innerText = `$${totalPay * 12}`;

	if (totalMiles >= bonusThreshold) {
		monthlyTotalView.innerText = `$${basePay + totalBonus}`;
		tenOverTenView.innerText = `$${totalTenOverTenBonus}`;
		fuelView.innerText = `$${totalFuelBonus}`;
		idleView.innerText = `$${totalIdleBonus}`;
		totalBonusView.innerText = `$${totalBonus}`;
		bonusCentsPerMileView.innerText = `Bonus CPM: $${bonusCentsPerMile.toFixed(2)}`;
	} else {
		totalBonus = 0;
		tenOverTenView.innerText = `$0`;
		fuelView.innerText = `$0`;
		idleView.innerText = `$0`;
		totalBonusView.innerText = `$0`;
	}
});
