$(document).ready(function(){
  var template_film = $("#template_film").html();
  var template_film_function = Handlebars.compile(template_film);

  var template_serie = $("#template_serie").html();
  var template_serie_function = Handlebars.compile(template_serie);

  var basic_api = "https://api.themoviedb.org/3";

  $(".container_film").hide();
  $(".container_serie").hide();

  $("button").click(function(){
    mostra_contenuti();
  });

  $(".input").keyup(function(evento){
    if (event.which == 13) {
      mostra_contenuti();
    }
  });



// ELENCO FUNZIONI

  function ricerca_film(nome_film){
    $.ajax({
      url: basic_api + "/search/movie",
      method: "GET",
      data: {
        "api_key": "4f8848b3c909b7778515a360127c4d90",
        "query": nome_film,
      },
      success: function (data) {

        var film_trovati = data.total_results;

        var template_film_variables;
        for (var i = 0; i < film_trovati; i++) {

          var voto = data.results[i].vote_average;
          var voto_stelle = converti_voto(voto);

          var language = data.results[i].original_language;
          var bandiera = inserisci_bandiera(language);

          template_film_variables = {
            "titolo": data.results[i].title,
            "tit_orig": data.results[i].original_title,
            "lingua": bandiera,
            "voto": voto_stelle
          };
          var html = template_film_function(template_film_variables);

          $(".container_film").append(html);
        }
      },
      error: function () {
        alert("E' avvenuto un errore.");
      }
    });
  }


  function ricerca_serie(nome_serie){
    $.ajax({
      url: basic_api + "/search/tv",
      method: "GET",
      data: {
        "api_key": "4f8848b3c909b7778515a360127c4d90",
        "query": nome_serie,
      },
      success: function (data) {

        var serie_trovate = data.total_results;

        var template_serie_variables;
        for (var i = 0; i < serie_trovate; i++) {

          var voto = data.results[i].vote_average;
          var voto_stelle = converti_voto(voto);

          var language = data.results[i].original_language;
          var bandiera = inserisci_bandiera(language);

          template_serie_variables = {
            "nome": data.results[i].name,
            "nome_orig": data.results[i].original_name,
            "lingua": bandiera,
            "voto": voto_stelle
          };
          var html = template_serie_function(template_serie_variables);

          $(".container_serie").append(html);
        }
      },
      error: function () {
        alert("E' avvenuto un errore.");
      }
    });
  }


  function converti_voto(voto_film){

    var voto_da_convertire = Math.ceil(voto_film / 2);

    var stelle_totali = "";
    for (var i = 0; i < 5; i++) {

      if (i < voto_da_convertire) {
        stelle_totali += '<i class="fas fa-star"></i>'
      } else {
        stelle_totali += '<i class="far fa-star"></i>'
      }
    }
    return stelle_totali;
  }

  function inserisci_bandiera(sigla_lingua){

    switch (sigla_lingua) {
      case "it":
      sigla_lingua = '<img src="flags/flag_italy.png">';
        break;
      case "en":
      sigla_lingua = '<img src="flags/flag_us_uk.png">';
        break;
      case "es":
      sigla_lingua = '<img src="flags/flag_spain.png">';
        break;
      case "fr":
      sigla_lingua = '<img src="flags/flag_france.png">';
        break;
      case "de":
      sigla_lingua = '<img src="flags/flag_germany.svg">';
        break;
    }
    return sigla_lingua;
  }

  function mostra_contenuti(){
    $(".container_film").hide();
    $(".container_serie").hide();
    $(".container_film").empty();
    $(".container_serie").empty();
    $(".container_film").fadeIn();
    $(".container_serie").fadeIn();
    var contenuti_cercati = $(".input").val();

    ricerca_film(contenuti_cercati);
    ricerca_serie(contenuti_cercati);
    $(".input").val("");
  }


});
