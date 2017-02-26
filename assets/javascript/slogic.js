// Initial array of movies
      var movies = ["Star Wars", "The Office", "Marvel", "Disney"];

      // Function for dumping the JSON content for each button into the div
      function displayGiphInfo() {
        

        // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
        console.log(this);
        var name = $(this).attr('data-name');
        var key = "dc6zaTOxFJmzC"
        //http to https
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + key ;
        //var queryURL = 'https://api.giphy.com/v1/gifs/search?q=undefined&api_key=dc6zaTOxFJmzC'
        $.ajax({
          url: queryURL
          , method: 'GET'
        }).done(function(response){
          console.log(response);
          $("#movieInfo").empty();
          for (var i = 0; i < response.data.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var gifDiv = $("<div class='response'>");

            var rating = response.data[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", response.data[i].images.original_still.url);
            gifImage.attr("data-still", response.data[i].images.original_still.url);
            gifImage.attr("data-animate", response.data[i].images.original.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("class", 'gif');

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#movieInfo").prepend(gifDiv);

          //var a = $("<div>");
          // Adding a class of movie to our button
          //a.addClass("response");
          // Adding a data-attribute
          //a.attr("data-name", movies[i]);
          // Providing the initial button text
          //var p = $("<p>").text("Rating: " + rating);
          // Adding the button to the buttons-view div
          //a.html(/*response.data[i].rating + */"<img src='" + response.data[i].images.original.url + "'>");

          //$("#movieInfo").append(a);
        }
        $(".gif").on("click", function() {
          var state = $(this).attr("data-state");
          
          if(state == "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        })
          //$('#movieInfo').html(response.data[0].rating + "<img src='" + response.data[0].images.original.url + "'>");
        });
      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#movies-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("movie");
          // Adding a data-attribute
          a.attr("data-name", movies[i]);
          // Providing the initial button text
          a.text(movies[i]);
          // Adding the button to the buttons-view div
          $("#movies-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      // Generic function for displaying the movieInfo
      $(document).on("click", ".movie", displayGiphInfo);
      renderButtons();
      //$(".movie").click(displayMovieInfo);

      
      // Calling the renderButtons function to display the intial buttons