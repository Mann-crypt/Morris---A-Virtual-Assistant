const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const wishBtn = document.querySelector('.wish-button');
const apiKey = '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';

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 2;


    
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 4 && hour < 12) {
        speak("Good Morning boss");
    } else if (hour >= 12 && hour < 16) {
        speak("Good Afternoon Boss");
    } else {
        speak("Good Evening Boss");
    }
}

wishBtn.addEventListener('click', () => {
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    if (transcript.toLowerCase().includes("hey morris") || transcript.toLowerCase().includes("hay morris")) {
        wishMe();
    } else {
        takeCommand(transcript.toLowerCase());
    }
};

btn.addEventListener('click', () => {
    window.speechSynthesis.cancel();

    content.textContent = "Listening";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey morris') || message.includes('hello morris') || message.includes('hii morris')) {
        speak("Hello Sir, How May I assist You?");
        content.textContent = "Hello Sir, How May I assist You?";
    } else if (message.includes("whats'up") || message.includes("how are you") ||  message.includes("how are you doing") || message.includes('hello morris how are you') || message.includes('hey morris how are you') || message.includes('whatsapp morris') || message.includes('whatsapp model')) {
        speak("I am fine sir, How may I assist you?");
        content.textContent = "I am fine sir, How may I assist you?";
    } else if (message.includes("what is your name") || message.includes("whats your name") ||  message.includes("how may i call you") || message.includes('what is your good name')) {
        speak("My name is MORRIS, sir.");
        content.textContent = "My name is MORRIS, sir.";
    }
    else if (message.includes("who are you") || message.includes("hu r u") || message.includes("tell me about yourself") || message.includes("who are your developers") || message.includes("who developed you") || message.includes("who are your creators")) {
        speak("I am MORRIS a virtual assistant, created be Manjot Singh by Using HTML and CSS for my design and JavaScript for my functioning. I am created to assist you in your daily life to make your daily life easier. I hope, I will be helpful to you for what my Master have made me.");
        content.textContent = "I am MORRIS a virtual assistant, created and developed by Manjot Singh by Using HTML and CSS for my design and JavaScript for my functioning. I am created to assist you in your daily life to make your daily life easier. I hope, I will be helpful to you for what my Master have made me."
    }
    else if (message.includes("what i am to you") || message.includes("what are we")) {
        speak("We are good friends, and I am friend who provides assistance to you.");
        content.textContent = "We are good friends, and I am friend who provides assistance to you.";
    }
    else if (message.includes("who created you") || message.includes("who is your creator")) {
        speak("My creators are Manjot Singh, he is my master and he have created me to assist you.");
        content.textContent = "My creators are Manjot Singh, he is my masters and he have created me to assist you.";
    }
    else if (message.includes("why are you made")) {
        speak("I am a virtual assistant, created to assist you in your daily life to make your daily life easier.");
        content.textContent = "I am a virtual assistant , created to assist you in your daily life to make your daily life easier.";
    }
    else if (message.includes("Gaand maraa..")) {
        speak("Tu gaand maraa bhosdike, apni maa mat chudaa.");
        content.textContent = "Tu gaand maraa bhosdike, apni maa mat chudaa.";
    }
    
      else if (message.includes("open google") || message.includes("take me to the google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    }  else if (message.includes("open netflix") || message.includes("take me to the netflix")) {
        window.open("https://www.netflix.com/browse", "_blank");
        speak("Opening netflix...");
    } else if (message.includes("open instagram") || message.includes("take me to the instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes("open gmail") || message.includes("take me to the gmail")) {
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
        speak("Opening g-mail...");
    } else if (message.includes("open whatsapp") || message.includes("take me to the whatsapp")) {
        window.open("https://web.whatsapp.com/", "_blank");
        speak("Opening whatsApp...");
    } else if (message.includes("open youtube") || message.includes("take me to the youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook") || message.includes("take me to the facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('on google') || message.includes('with google') || message.includes('in google')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else {
        speak("Let me get it");
        content.textContent = "Thinking...";
    fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
        temperature: 0.7
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
    if (data && data.choices && data.choices.length > 0) {
        const reply = data.choices[0].message.content.trim();
        speak(reply);
        content.textContent = reply;
    } else {
        speak("Sorry, I couldn't understand that.");
        content.textContent = "Sorry, I couldn't understand that.";
    }
})
.catch(error => {
    console.error("API Error:", error);
    speak("Sorry, something went wrong.");
    content.textContent = "Sorry, something went wrong.";
});
    }
}