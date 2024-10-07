let plantType = "";
let waterCount = 0;
let sunlightLevel = 50;
let growthStage = "Seed";

document.getElementById("start-button").addEventListener("click", () => {
    plantType = document.getElementById("plant-select").value;
    document.getElementById("plant-area").style.display = "none";
    document.getElementById("plant-container").style.display = "block";
    loadPlantData();
});

document.getElementById("water-button").addEventListener("click", () => {
    waterPlant();
});

document.getElementById("sunlight-slider").addEventListener("input", (event) => {
    sunlightLevel = event.target.value;
    updateGrowthFeedback();
});

function loadPlantData() {
    const plantData = JSON.parse(localStorage.getItem("plantData")) || {};
    waterCount = plantData.waterCount || 0;
    sunlightLevel = plantData.sunlightLevel || 50;
    growthStage = plantData.growthStage || "Seed";

    updatePlantDisplay();
}

function waterPlant() {
    waterCount++;
    updatePlantGrowth();
    updateGrowthFeedback();
    savePlantData();
}

function updatePlantGrowth() {
    if (waterCount >= 5 && growthStage === "Seed") {
        growthStage = "Sprout";
    } else if (waterCount >= 10 && growthStage === "Sprout") {
        growthStage = "Small Plant";
    } else if (waterCount >= 15 && growthStage === "Small Plant") {
        growthStage = "Mature Plant";
    }
    updatePlantDisplay();
}

function updatePlantDisplay() {
    const plantContainer = document.getElementById("plant");
    plantContainer.innerHTML = `<p>Your ${plantType} is at the ${growthStage} stage!</p>`;
    document.getElementById("growth-status").innerText = `Water Count: ${waterCount}, Sunlight Level: ${sunlightLevel}`;
}

function updateGrowthFeedback() {
    const feedback = document.getElementById("feedback");
    if (sunlightLevel < 30) {
        feedback.innerText = "Your plant needs more sunlight!";
    } else if (sunlightLevel > 70) {
        feedback.innerText = "Your plant is getting too much sunlight!";
    } else {
        feedback.innerText = "Your plant is getting the right amount of sunlight.";
    }
}

function savePlantData() {
    const plantData = {
        waterCount: waterCount,
        sunlightLevel: sunlightLevel,
        growthStage: growthStage
    };
    localStorage.setItem("plantData", JSON.stringify(plantData));
}
