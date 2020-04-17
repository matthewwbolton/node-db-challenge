exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("resources").insert([
        {
          resource_name: "Computer",
          resource_description: "Computer for Computing Power",
        },
        {
          resource_name: "Internet Connection",
          resource_description: "Internet Connection for Online Access",
        },
        {
          resource_name: "Microphone",
          resource_description: "Microphone for Remote Video Conferencing",
        },
        {
          resource_name: "Conference Room",
          resource_description:
            "Virtual Conference Room for Online Viedo Conferencing",
        },
        {
          resource_name: "Graphing Notebook",
          resource_description:
            "Notebook for Taking Notes and Drawing Diagrams",
        },
        {
          resource_name: "Webcam",
          resource_description: "Webcam for Online Video Conferencing",
        },
        {
          resource_name: "Delivery Van",
          resource_description: "Will not use this resource for anything",
        },
        {
          resource_name: "Caffeine",
          resource_description: "Will need caffeine for every project.",
        },
      ]);
    });
};
