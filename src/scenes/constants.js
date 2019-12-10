export const FOOD_TYPES = [
    {
        index: 0,
        cost: 1,
        fulness: 10,
        name: 'первая еда'
    },
    {
        index: 1,
        cost: 1,
        fulness: 10,
        name: 'вторая еда'
    },
    {
        index: 2,
        cost: 1,
        fulness: 10,
        name: 'третья еда'
    },
    {
        index: 3,
        cost: 1,
        fulness: 10,
        name: 'четвертая еда'
    },
    {
        index: 4,
        cost: 1,
        fulness: 10,
        name: 'пятая еда'
    },
    {
        index: 5,
        cost: 1,
        fulness: 10,
        name: 'шестая еда'
    },
];

export const ENEMY_STRENGTH = [
    {
        id: 1,
        strength: 1,
    },
    {
        id: 2,
        strength: 2,
    },
    {
        id: 3,
        strength: 3,
    },
    {
        id: 4,
        strength: 4,
    },
    {
        id: 5,
        strength: 5,
    },
];

export const PET_MESSAGES = [
    'На вранье далеко не уедешь... Даже верхом.',
    'В другой раз ноги из жопы выдерну и обратно в гузно засажу!',
    'Это Новиград. На кострах здесь горят только невиновные',
    'Проклятые идеалисты... Вы разрушаете рынок!',
    'Хуже нет, чем вести дела с собственной семьей.',
    'А медом тебе жопу уже намазали, герой?',
];

// 864000000ms или 24 часа - количество часов в игровых сутках. К этому таймеру привязаны остальные циклы.
const globalTime = 24 * 60 * 60 * 1000;

export const TIMER_CONFIG = {
    // 10s: периодичность появления "рандомных" сообщений от питомца
    randomMessage: 10000,
    // 15s: время за которое сытость уменьшает на 1 единицу
    fulnessDecrease: 1000,
    // 0.3s: время за которое во сне энергия увеличивается на 10 единиц
    sleep: 300
};

export const PETS_PARAMETERS = [
    {
        id: 0,
        name: 'Утопец',
        cost: 0,
    },
    {
        id: 1,
        name: 'Гуль',
        cost: 10,
    },
    {
        id: 2,
        name: 'Гнилец',
        cost: 20,
    },
    {
        id: 3,
        name: 'Водная баба',
        cost: 5000,
    },
    {
        id: 4,
        name: 'Туманник',
        cost: 5000,
    },
];
