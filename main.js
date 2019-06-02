$(document).ready(function(){
  var template_film = $("#template_film").html();
  var template_film_function = Handlebars.compile(template_film);

  var template_serie = $("#template_serie").html();
  var template_serie_function = Handlebars.compile(template_serie);

  var basic_api = "https://api.themoviedb.org/3";
  var basic_url_img = "https://image.tmdb.org/t/p/";

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

  $(".box_film").on("mouseenter", ".contenuto", function(){
    $(this).removeClass("pd-0");
    $(this).children(".locandina").addClass("hidden");
    $(this).children(".descrizione").removeClass("hidden");
    $(this).addClass("border-1sw");
  });

  $(".box_serie").on("mouseenter", ".contenuto", function(){
    $(this).removeClass("pd-0");
    $(this).children(".locandina").addClass("hidden");
    $(this).children(".descrizione").removeClass("hidden");
    $(this).addClass("border-1sw");
  });

  $(".box_film").on("mouseleave", ".contenuto", function(){
    $(this).addClass("pd-0");
    $(this).children(".locandina").removeClass("hidden");
    $(this).children(".descrizione").addClass("hidden");
    $(this).removeClass("border-1sw");
  });

  $(".box_serie").on("mouseleave", ".contenuto", function(){
    $(this).addClass("pd-0");
    $(this).children(".locandina").removeClass("hidden");
    $(this).children(".descrizione").addClass("hidden");
    $(this).removeClass("border-1sw");
  });

  $(".menu_home").click(function(){
    $(".container_film").fadeIn();
    $(".container_serie").fadeIn();
  });

  $(".menu_serie_tv").click(function(){
    $(".container_film").hide();
    $(".container_serie").fadeIn();
  });

  $(".menu_film").click(function(){
    $(".container_film").fadeIn();
    $(".container_serie").hide();
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

          var finale_url_img = data.results[i].poster_path;
          var indirizzo_img = crea_url_locandina(finale_url_img);


          template_film_variables = {
            "titolo": data.results[i].title,
            "tit_orig": data.results[i].original_title,
            "lingua": bandiera,
            "voto": voto_stelle,
            "descrizione": data.results[i].overview,
            "url_img": indirizzo_img
          };
          var html = template_film_function(template_film_variables);

          $(".box_film").append(html);
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

          var finale_url_img = data.results[i].poster_path;
          var indirizzo_img = crea_url_locandina(finale_url_img);

          template_serie_variables = {
            "nome": data.results[i].name,
            "nome_orig": data.results[i].original_name,
            "lingua": bandiera,
            "voto": voto_stelle,
            "descrizione": data.results[i].overview,
            "url_img": indirizzo_img
          };
          var html = template_serie_function(template_serie_variables);

          $(".box_serie").append(html);
        }
      },
      error: function () {
        alert("E' avvenuto un errore.");
      }
    });
  }

  function crea_url_locandina(stringa_finale){
    var url_completo = "";

    if (stringa_finale == null || stringa_finale == "") {
      url_completo = "img/locandina_non_disponibile.jpg";
    } else {
      url_completo = basic_url_img + "w342/" + stringa_finale;
    }
    return url_completo;
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
      sigla_lingua = '<img src="img/flags/flag_italy.png">';
        break;
      case "en":
      sigla_lingua = '<img src="img/flags/flag_us_uk.png">';
        break;
      case "es":
      sigla_lingua = '<img src="img/flags/flag_spain.png">';
        break;
      case "fr":
      sigla_lingua = '<img src="img/flags/flag_france.png">';
        break;
      case "de":
      sigla_lingua = '<img src="img/flags/flag_germany.svg">';
        break;
    }
    return sigla_lingua;
  }

  function mostra_contenuti(){
    $(".container_film").hide();
    $(".container_serie").hide();
    $(".box_film").empty();
    $(".box_serie").empty();
    $(".container_film").fadeIn();
    $(".container_serie").fadeIn();
    var contenuti_cercati = $(".input").val();

    ricerca_film(contenuti_cercati);
    ricerca_serie(contenuti_cercati);
    $(".input").val("");
  }


});
