class Growth {
    constructor(scene) {
        this.scene = scene;

        this.setPetBirthdate();
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

    calculatePetAge() {
        let dateNow = new Date().getTime();
        const petBirthDate = JSON.parse(localStorage.getItem('birthDate')).petBirthdate;
        let petAge = Math.floor((dateNow - petBirthDate) / 86400000);
        this.updateAge(petAge);
    }

    updateAge(petAge) {
        this.scene.petAge = petAge;
        this.scene.setDataToStorage({ petAge: petAge });
        if (this.scene.GameScene.pet) {
            switch (this.scene.petAge) {
                case this.scene.growthStages.teenager:
                    this.scene.GameScene.pet.setTexture('teenager'); // меняем текстуру спрайта
                    this.scene.GameScene.pet.play('teenager_anim');
                    break;
                case this.scene.growthStages.grownUp:
                    this.scene.GameScene.pet.setTexture('grownUp');
                    this.scene.GameScene.pet.play('grownUp_anim');
                    break;
            }
        }
    }
}

module.exports = Growth;
