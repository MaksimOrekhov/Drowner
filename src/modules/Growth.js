class Growth {
    constructor(scene) {
        this.scene = scene;
        this.birthDate = null;
        this.storageBirthDate = JSON.parse(localStorage.getItem('birthDate'));

        this.setPetBirthdate();
        this.addPetAnimations();
        this.createAgeText();
        this.calculatePetAge();
    }

    setPetBirthdate() {
        const birthDate = new Date().getTime();
        if (!this.storageBirthDate) {
            localStorage.setItem(
                'birthDate',
                JSON.stringify({ petBirthdate: birthDate })
            );
        }
    }

    addPetAnimations() {
        let _this = this.scene;

        _this.anims.create({
            key: 'child_anim',
            frames: _this.anims.generateFrameNumbers('child', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });

        _this.anims.create({
            key: 'teenager_anim',
            frames: _this.anims.generateFrameNumbers('teenager', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });

        _this.anims.create({
            key: 'grownUp_anim',
            frames: _this.anims.generateFrameNumbers('grownUp', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });
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
        const petBirthDate = this.storageBirthDate.petBirthdate;
        let petAge = Math.round((dateNow - petBirthDate) / 86400000);
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
