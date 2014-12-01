// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

   var lang_to		= "English";
   var lang_from		= "Spanish";
   var current_dict	= dicts[lang_to][lang_from]
   var rightAnswer=loadRandomWord(current_dict);
   var spanishWord = current_dict[rightAnswer];
   var arrayOfEnglish  = Object.keys(current_dict);


   $("#guessInput").autocomplete({
      source: arrayOfEnglish
   });

   //answer button pressed
   $("#AnswerButton").click(function(event) {

      var input = $("input").val();
      var RightOrWrong="";
      var answer="";
      var style="";

      if(rightAnswer==input) {
         RightOrWrong='right';
         answer = '<span class="ui-icon ui-icon-check"></span>';
      } else {
         RightOrWrong='wrong';
         style= 'style="text-decoration: line-through;"';
         answer =  '<div class = "Answer"><h2 class=wrong>'+rightAnswer+'</h2></div>';
      }

      var row = '<div class = "row" id = "FirstRow">'; //needs </div> at the end
      var spanish = '<div class = "Spanish"><h2 class='+RightOrWrong+'>'+spanishWord+'</h2></div>';
      var english = '<div class = "English"'+style+'><h2 class='+RightOrWrong+'>'+input+'</h2></div>';
      var htmlToInsert = (row+spanish+english+answer+'</div>');

      //$("#container1").append(htmlToInsert);

      //manually insert this html string after first row
      $(htmlToInsert).insertAfter( $("#FirstRow") );

      //change input to blank
      $("#guessInput").val("").change();

      //load up new words
      rightAnswer = loadRandomWord(current_dict);
      spanishWord = current_dict[rightAnswer];

   });

});

//pass in dictionary, return a random english word and print the corresponding word in spanish
function loadRandomWord(current_dict) {
   //current_dict = {English:Spanish}
   var arrayOfEnglish = Object.keys(current_dict);
   var randomIndex = Math.floor(Math.random()*arrayOfEnglish.length);
   var englishWord = arrayOfEnglish[randomIndex];
   var randomSpanishWord = current_dict[englishWord];
   //change text in id= RandomSpanishWord to randomSpanishWord
   $('#RandomSpanishWord').html(randomSpanishWord);
   return englishWord;
}
