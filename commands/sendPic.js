module.exports = {
    name: 'sendPic',
    description: "sends a pictur of C.C. depending on who sent the message",
    execute (message, args){
        let normal = ["https://imgix.ranker.com/user_node_img/50088/1001759051/original/distance-yourself-from-those-you-love-photo-u1?fit=crop&fm=pjpg&q=60&w=375&dpr=1",
    "https://static.wikia.nocookie.net/codegeass/images/9/9b/Geass_%28181%29.png/revision/latest/top-crop/width/300/height/300?cb=20131024200524",
"https://static.wikia.nocookie.net/fairytailfanon/images/c/c3/Angelica_profile.jpg/revision/latest?cb=20151014152616",
"https://images5.fanpop.com/image/photos/26700000/C-C-Screencap-cc-from-code-geass-26790487-600-336.jpg",
"https://deculture101.files.wordpress.com/2008/07/vlcsnap-3466899.jpg",
"https://images6.fanpop.com/image/photos/37200000/C-C-cc-from-code-geass-37235369-400-225.jpg",
"https://images6.fanpop.com/image/photos/37200000/C-C-cc-from-code-geass-37235371-640-446.jpg",
"https://i.pinimg.com/originals/0d/22/7e/0d227e9664d9c89cb4f61f3bfd5c71f1.png",
"https://images5.fanpop.com/image/photos/29100000/lelouch-cc-code-geass-lelouch-of-the-rebellion-29134599-576-719.jpg",
"https://images5.alphacoders.com/775/775473.jpg"];

        let ecchi = ["https://lh3.googleusercontent.com/proxy/5VGnKVX7YRBKK9y6n-i_X81Nx4mfg3Wt-rBVi_r6JChR2nyir4mGyyLsLX0qtCHhLj1Cqzjtlhk0K7ss5Go9nrTRwglgSoJxIh5DhwrplCVetPgyv6E", 
        "https://lh3.googleusercontent.com/proxy/Fj-e9jVUQtKMbmq42614o-_iDBqF3C3f39Q_qCZatOEBF1JMy62jXQYSPSs7iAGays6Q2AbZkhOM8-0H0CA",
    "https://lh3.googleusercontent.com/proxy/TCCi0bNNi1pwsMwqxN7S6nRsBFJD3LarOSYMT1A37FoC2d8hT6Fr51UCgG5GEdVT_i73n0azDjNodtQIUqfBjgag-QuM2B0Tk9fSKn3nECtXRr-mgg",
"https://tse2.mm.bing.net/th?id=OIP.2Gg74W0ifw012c6Lt2iPCgHaJ4&pid=15.1",
"https://ndlc.info/upload/ddccda3fc9fd9207333c55d6dadd2f5d.jpg",
"https://liliy.net/blog/wp-content/uploads/2008/06/lelouch-kallen-e1317870479104.png"];

        let reject = ["https://www.pngitem.com/pimgs/m/406-4066534_cc-code-geass-folder-icon-hd-png-download.png",
        "https://1.bp.blogspot.com/-jkKaYq8_3bU/U-WjYuIPwcI/AAAAAAAAGgM/2gNjvjzF-D0/s1600/4-4753-14610-OZCCodeGeassLelouchoftheRebellionEpisode25ZeroFINALmkvsnapshot221020100407234406jpg-620x.jpg",
    "eww no.", "uhmm I have a boyfriend.", "don't text me ever again.", "ewwww, PERVERT.", "Lelouch will hear about this.",
"what the fuck...", "please stay away from me.", "ばか"];

        if (!args[0]){
            let randNum = Math.floor(Math.random() * 10);
            message.channel.send(normal[randNum]);
        }
        else if (args[0] == 'nude'){
            if (message.author.id == "391199878015090689"){
                let randNum = Math.floor(Math.random() * 6);
                if (randNum == 5){
                    message.channel.send(ecchi[randNum]);
                    message.channel.send("why don't you ask Kallen instead.");
                }
                else {
                    message.channel.send({
                        files: [{
                           attachment: ecchi[randNum],
                           name: "SPOILER_FILE.jpg"
                        }]
                     });
                }
            }
            else {
                let randNum = Math.floor(Math.random() * 10);
                if (randNum == 0){
                    message.channel.send(reject[randNum]);
                    message.channel.send("that is for Lelouch alone.");
                }
                else if (randNum == 1){
                    //message.channel.send(reject[randNum]);
                    message.channel.send("My boyfriend will kill you!");
                    message.channel.send(reject[randNum]);
                }
                else {
                    message.channel.send(reject[randNum]);
                }
            }
        }
        else {
            message.channel.send("?");
            return;
        }
    }
}