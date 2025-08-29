$(document).ready(function(){
    // Execute when the document is fully loaded
    
    $("#search-btn").click(function(){
        // When the search button is clicked
        
        let country = $("#search-box").val(); // Get the input value 
        
        if (country) { // Check if input is not empty
            $.get("https://restcountries.com/v3.1/name/" + country, function(data){
                // Make an API request to get country data
                
                let countryInfo = data[0]; // Get the first result from the response
                
                $("#country-name").text(countryInfo.name.common); // Set country name
                $("#country-flag").attr("src", countryInfo.flags.png).show(); // Set and show flag
                $("#capital").text("Capital: " + (countryInfo.capital ? countryInfo.capital[0] : 'N/A')); // Set capital name
                $("#population").text("Population: " + countryInfo.population.toLocaleString()); // Set population with formatting
                $("#region").text("Region: " + countryInfo.region); // Set region
                $("#error").text(""); // Clear error message
            }).fail(function(){
                // If the API request fails (invalid country or network issue)
                $("#error").text("Country not found. Try again."); // Show error message
                $("#country-name, #capital, #population, #region").text(""); // Clear previous data
                $("#country-flag").hide(); // Hide flag
            });
        } else {
            $("#error").text("Please enter a country name."); // Show error if input is empty
        }
    });

    // Change button color on mouse enter
    $("#search-btn").mouseenter(function(){
        $(this).css("background-color", "green");
    });

    // Reset button color on mouse leave
    $("#search-btn").mouseleave(function(){
        $(this).css("background-color", "");
    });
});
