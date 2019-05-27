$(document).ready(function(){
  var template_film = $("#template_film").html();
  var template_film_function = Handlebars.compile(template_film);

  $("button").click(function(){

    $(".container").empty();

    var film_cercati = $(".input").val();

    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        "api_key": "4f8848b3c909b7778515a360127c4d90",
        "query": film_cercati
      },
      success: function (data) {

        film_trovati = data.total_results;

        var context;
        for (var i = 0; i < film_trovati; i++) {
          context = {
            "titolo": data.results[i].title,
            "tit_orig": data.results[i].original_title,
            "lingua": data.results[i].original_language,
            "voto": data.results[i].vote_average
          };
          var html = template_film_function(context);

          $(".container").append(html);
        }
      },
      error: function () {
        alert("E' avvenuto un errore.");
      }
    });

    $(".input").val("");
  });
});
