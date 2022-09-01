const LaunchTimeStamp = Date.now();
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready Mother Fucker Log in as ${client.user.tag}`);
        console.log(LaunchTimeStamp);
    },
};