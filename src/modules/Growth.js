class Growth {
    constructor(scene) {
        this.scene = scene;

        this.setPetBirthdate();
        this.createAgeText();
        this.calculatePetAge();
    }

    setPetBirthdate() {
        const birthDate = new Date().getTime();
        const petBirthDate = JSON.parse(localStorage.getItem('birthDate'));
        if (!petBirthDate) {
            localStorage.setItem(
                'birthDate',
                JSON.stringify({ petBirthdate: birthDate })
            );
        }
    }

    createAgeText() {
        this.growthTxt = this.scene.add.text(
            150,
            20,
            `Возраст(дней): ${this.scene.petAge}`
        );
    }

    calculatePetAge() {
        let dateNow = new Date().getTime();
        const petBirthDate = JSON.parse(localStorage.getItem('birthDate')).petBirthdate;
        let petAge = Math.floor((dateNow - petBirthDate) / 86400000);
        this.updateAge(petAge);
    }

    updateAge(petAge) {
        this.scene.petAge = petAge;
        this.scene.localStorageSetter.setDataToStorage();
        switch (this.scene.petAge) {
            case this.scene.growthStages.teenager:
                this.scene.pet.setTexture('teenager'); // меняем текстуру спрайта
                this.scene.pet.play('teenager_anim');
                break;
            case this.scene.growthStages.grownUp:
                this.scene.pet.setTexture('grownUp');
                this.scene.pet.play('grownUp_anim');
                break;
        }
        this.growthTxt.setText(`Возраст(дней): ${this.scene.petAge}`);
    }
}

module.exports = Growth;
