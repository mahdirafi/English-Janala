 const createElement = (arr) => {
 const htmlElements = arr.map((ele) => `<span class="btn">${ele}</span>`);
  return (htmlElements.join(" "));
};
// console.log('im js');
// spinner
const manageSpinner = (status) => {
    if (status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
 };


const loadLesson=  () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((response) => response.json())  // promise of json data
    .then((data) => displayLesson(data.data));
};

const removeActive = () => {
   const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    manageSpinner(true);
    // console.log(id);
    const url =`https://openapi.programming-hero.com/api/level/${id}` ;
    // console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // console.log(clickBtn);
        removeActive();     // remove all active class 
        const clickBtn= document.getElementById(`lesson-bnt-${id}`);
        clickBtn.classList.add("active"); // add only clicked active class
        displayLevelWords(data.data)
    });
    
};

const loadWordDetail =async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}` ;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div  class="space-y-5">

    <div class="">
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.meaning})</h2>
    </div>
    <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p class="  font-semibold"> ${word.meaning}</p>
    </div>
     
    <div class="">
        <h2 class="font-bold">Example</h2>
        <p class="font-semibold"> ${word.sentence}</p>
    </div>
 
    <div class="">
        <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
   
    <div class=""> ${createElement(word.synonyms)} </div>
     </div>
    <button class="btn btn-primary rounded-md" >Complete Learning</button>
    
</div>
    
    
    `;
    // console.log(object);
    document.getElementById("word_modal").showModal();
};

const displayLevelWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0){
        wordContainer.innerHTML = `
             <div class="text-center col-span-full space-y-6 bangla bg-white p-10 rounded-md shadow-sm">
             <img class="mx-auto" src="./assets/alert-error.png"  />
            <p class="font-bold text-2xl text-black-200">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান |</h2>
        </div>
        `;manageSpinner(false);
        return;
    }

    words.forEach((word) => {

        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white p-10 rounded-xl  shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-xl ">${word.word? word.word : "কোন শব্দ পাওয়া যায় নি"}</h2>
            <p class="font-semibold">Meaning / Pronounciation </p>
            <div class="font-2xl font-medium bangla">${word.meaning?word.meaning : "কোন অনুবাদ পাওয়া যায় নি"} / ${word.pronunciation? word.pronunciation :"কোন উচ্চারণ পাওয়া যায় নি"}"</div>
            <div class="flex justify-between items-center">

                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a97ff15] hover:bg-[#1a97ff60]"><i class="fa-solid fa-circle-info"></i></button>

                <button class="btn bg-[#1a97ff15] hover:bg-[#1a97ff60]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
    manageSpinner(false) ;
};

// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"


const displayLesson =(lessons) => {
//  console.log(lessons);
//1.get into container & empty
const levelContainer = document.getElementById("level-container");
levelContainer.innerHTML = "" ;

// 2. get into everyLesson 
for(let lesson of lessons) {
    // 3. CreateElements
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-bnt-${lesson.level_no}"
         onclick ="loadLevelWord(${lesson.level_no})" 
        class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
    `;
    // 4.append the container
    levelContainer.append(btnDiv);
}
// lessons.forEach((lesson) =>{
// });
};

// loadLevelWord();
loadLesson(); // if not call array function then not seen in console.log()

document.getElementById("btn-search").addEventListener("click" ,  () => {
    removeActive();
    const input = document.getElementById("input-search") ;
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res)=>res.json())
    .then((data) => {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter((word) => 
        word.word.toLowerCase().includes(searchValue));
        
        displayLevelWords(filterWords);
    });
});