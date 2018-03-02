function nowPlaying(args) {
    let artistName = args[1];
    let trackName = args[0];
    let durationMinutes = args[2];
    console.log("Now Playing: " + artistName + " - " + trackName + " [" + durationMinutes + "]");
}

nowPlaying(['Number One', 'Nelly', '4:09']);