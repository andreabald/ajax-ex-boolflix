$(document).ready(function(){
  var template_film = $("#template_film").html();
  var template_film_function = Handlebars.compile(template_film);

  var basic_api = "https://api.themoviedb.org/3/";

  $("button").click(function(){

    $(".container").empty();
    var film_cercati = $(".input").val();

    ricerca_film(film_cercati);
    $(".input").val("");
  });

  $(".input").keyup(function(evento){

    if (event.which == 13) {
      $(".container").empty();
      var film_cercati = $(".input").val();

      ricerca_film(film_cercati);
      $(".input").val("");
    }
  });



  function ricerca_film(nome_film){
    $.ajax({
      url: basic_api + "search/movie",
      method: "GET",
      data: {
        "api_key": "4f8848b3c909b7778515a360127c4d90",
        "query": nome_film,

      },
      success: function (data) {

        film_trovati = data.total_results;

        var context;
        for (var i = 0; i < film_trovati; i++) {

          var voto = data.results[i].vote_average;
          var voto_stelle = converti_voto(voto);

          var language = data.results[i].original_language;
          var bandiera = inserisci_bandiera(language);
          console.log(bandiera);

          context = {
            "titolo": data.results[i].title,
            "tit_orig": data.results[i].original_title,
            "lingua": bandiera,
            "voto": voto_stelle
          };
          var html = template_film_function(context);

          $(".container").append(html);
        }
      },
      error: function () {
        alert("E' avvenuto un errore.");
      }
    });
  }

  function converti_voto(voto_film){


    voto_da_convertire = Math.ceil(voto_film / 2);

    var stelle_totali = "";
    var indice = 0;
    for (var i = 0; i < 5; i++) {

      if (indice < voto_da_convertire) {
        stelle_totali = stelle_totali + '<i class="fas fa-star"></i>'
      } else {
        stelle_totali = stelle_totali + '<i class="far fa-star"></i>'
      }
      indice++;
    }
    return stelle_totali;
  }

  function inserisci_bandiera(sigla_lingua){


    switch (sigla_lingua) {
      case "it":
      sigla_lingua = '<img src="flags/italy.png">';
        break;
      case "en":
      sigla_lingua = '<img src="flags/united_kingdom.png">';
        break;
      case "es":
      sigla_lingua = '<img src="flags/spain.png">';
        break;
      case "fr":
      sigla_lingua = '<img src="flags/france.png">';
        break;
      case "de":
      sigla_lingua = '<img src="flags/germany.png">';
        break;
    }
    return sigla_lingua
  }


});
