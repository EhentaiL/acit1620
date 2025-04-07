/* Please do not modify any of the provided code snippets*/

const shuffle = (list) => {
    let templist = [...list];
    let currentIndex = templist.length;
    let randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        const temp = templist[currentIndex];
        templist[currentIndex] = templist[randomIndex];
        templist[randomIndex] = temp;
    }
    return templist;
};

/* Step 1: */
const urls = [
    "https://i.ibb.co/sjvVrG3/fruit-plyh.jpg",
    "https://i.ibb.co/g3tqj4w/fruit-zxcv.jpg",
    "https://i.ibb.co/88Hy4rD/fruit-wert.jpg",
    "https://i.ibb.co/NmNMLKF/fruit-astt.jpg",
    "https://i.ibb.co/qp8Q1G6/fruit-dfgh.jpg",
    "https://i.ibb.co/9thfVhB/fruit-hjkl.jpg",
    "https://i.ibb.co/YtTfqvD/fruit-dcnj.jpg",
    "https://i.ibb.co/CVwKM8Z/fruit-ecuh.jpg",
    "https://i.ibb.co/ccNyKX0/fruit-uzxc.jpg"
];

const randomUrls = shuffle(urls);

const images = document.querySelectorAll(".card img");

/* Step 2: */
images.forEach((img, index) => {
    img.src = randomUrls[index];
    img.alt = "Fruit Image";
});

const h1 = document.querySelector("h1");
h1.append("!");