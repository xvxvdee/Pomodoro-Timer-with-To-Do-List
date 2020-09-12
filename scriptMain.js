const ABOUT_CONTENTTITLE = document.querySelector(
  "#aboutContainer #aboutContentTitle"
);
const ABOUT_CONTENTTEXT = document.querySelector(
  "#aboutContainer #aboutContentText"
);

const ABOUT_LEFTARROW = document.querySelector(" #leftSwipe");
const ABOUT_RIGHTARROW = document.querySelector(" #rightSwipe");

//About Container
var aboutTitles = ["What It Is?", "How It Works?", "The Benefits"];
var aboutText = [
  "A time management method developed in the late 1980s. The technique is easy to practice because all it invovles is a timer. The technique involves dividing work periods into intervals of 25 minutes seperating them by breaks.",
  "<li>Add all the tasks you want to complete<br>  to the To-List</li> <li>Set your short break length (2-5 mins)</li> <li>Set your long break length (15-30)</li> <li>Then start!</li>",
  "<li>Manage distractions</li><li>Maintain Motivation</li><li>Improves planning</li><li>Improves time management skills</li><li>Eliminate Burnouts</li>",
];
let a = 0;
ABOUT_CONTENTTITLE.innerHTML = aboutTitles[a];
ABOUT_CONTENTTEXT.innerHTML = aboutText[a];


ABOUT_LEFTARROW.addEventListener('click', function(){
  console.log(a +"<<<");

  if(a==0){
    console.log(a);
    a=2;
    ABOUT_CONTENTTITLE.innerHTML = aboutTitles[a];
    ABOUT_CONTENTTEXT.innerHTML = aboutText[a];
  }
  else{
    a-=1;
    ABOUT_CONTENTTITLE.innerHTML = aboutTitles[a];
    ABOUT_CONTENTTEXT.innerHTML = aboutText[a];
  }

});

ABOUT_RIGHTARROW.addEventListener('click', function(){
  console.log(a +"<<<");

  if(a==2){
    console.log(a);
    a=0;
    ABOUT_CONTENTTITLE.innerHTML = aboutTitles[a];
    ABOUT_CONTENTTEXT.innerHTML = aboutText[a];
  }
  else{
    a+=1;
    ABOUT_CONTENTTITLE.innerHTML = aboutTitles[a];
    ABOUT_CONTENTTEXT.innerHTML = aboutText[a];
  }

});