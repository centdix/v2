import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  var id = $(".room-id").attr("room-id");
  var div_id = "#chat-box-" + $(".room-id").attr("room-id");

  consumer.subscriptions.create({ channel: "ChatRoomChannel", id: parseInt(id)}, {
    connected() {
      console.log("connected to room " + id);
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      $(div_id).append("<p style='font-size: medium;'>" + data.message + " - " + data.user + "</p>");
      // Called when there's incoming data on the websocket for this channel
    }
  });  
});
