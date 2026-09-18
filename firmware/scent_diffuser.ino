
#include <SPI.h>
#include "pitches.h"
#include <FastLED.h>

#define LED_PIN 10
#define NUM_LEDS 24
#define BRIGHTNESS 64
#define LED_TYPE WS2812
#define COLOR_ORDER GRB
CRGB leds[NUM_LEDS];

// Buttons
const int BUTTON_ONE = 6;
const int BUTTON_TWO = 7;
const int BUTTON_THREE = 8;
const int BUTTON_FOUR = 9;

// Atomizers
const int ATOMIZER_ONE = 4;
const int ATOMIZER_TWO = 3;
const int ATOMIZER_THREE = 2;
const int ATOMIZER_FOUR = 1;

// Button States
byte lastButtonOneState = LOW;
byte lastButtonTwoState = LOW;
byte lastButtonThreeState = LOW;
byte lastButtonFourState = LOW;

int activeScent = 0;
int prevScent = 0;

// Speaker & sounds
int hasPlayed = 0;
const int SPEAKER = 12;

#define SOUND_SIZE 4
int DURATION[] = {
  // note durations: 8 = quarter note, 4 = 8th note, etc.
  1,
  1,
  1,
  1,
};

int SOUND_ONE[] = {
  NOTE_E6,
  NOTE_D6,
  NOTE_C6,
  NOTE_G6,
};

int SOUND_TWO[] = {
  NOTE_G6,
  NOTE_C6,
  NOTE_D6,
  NOTE_E6,
};

int SOUND_THREE[] = {
  NOTE_C6,
  NOTE_E6,
  NOTE_C6,
  NOTE_E6,
};

int SOUND_FOUR[] = {
  NOTE_G6,
  NOTE_D6,
  NOTE_E6,
  NOTE_C6,
};

int speed = 90;  //higher value, slower notes

void setup() {
  Serial.begin(9600);

  // Initialize RGB LED
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS);

  // Initialize Button pins
  pinMode(BUTTON_ONE, INPUT_PULLUP);
  pinMode(BUTTON_TWO, INPUT_PULLUP);
  pinMode(BUTTON_THREE, INPUT_PULLUP);
  pinMode(BUTTON_FOUR, INPUT_PULLUP);

  // Initialize atomizer
  pinMode(ATOMIZER_ONE, OUTPUT);
  pinMode(ATOMIZER_TWO, OUTPUT);
  pinMode(ATOMIZER_THREE, OUTPUT);
  pinMode(ATOMIZER_FOUR, OUTPUT);
}

void loop() {
  // Read button press
  byte buttonOneState = digitalRead(BUTTON_ONE);
  byte buttonTwoState = digitalRead(BUTTON_TWO);
  byte buttonThreeState = digitalRead(BUTTON_THREE);
  byte buttonFourState = digitalRead(BUTTON_FOUR);

  // Check first button state
  if (buttonOneState != lastButtonOneState) {
    lastButtonOneState = buttonOneState;
    if (buttonOneState == LOW) {
      if (activeScent != 1) {
        hasPlayed = 0;
        activeScent = 1;
      } else {
        activeScent = 0;
      }
    }
  }

  // Check second button state
  if (buttonTwoState != lastButtonTwoState) {
    lastButtonTwoState = buttonTwoState;
    if (buttonTwoState == LOW) {
      if (activeScent != 2) {
        hasPlayed = 0;
        activeScent = 2;
      } else {
        activeScent = 0;
      }
    }
  }

  // Check third button state
  if (buttonThreeState != lastButtonThreeState) {
    lastButtonThreeState = buttonThreeState;
    if (buttonThreeState == LOW) {
      if (activeScent != 3) {
        hasPlayed = 0;
        activeScent = 3;
      } else {
        activeScent = 0;
      }
    }
  }

  // Check fourth button state
  if (buttonFourState != lastButtonFourState) {
    lastButtonFourState = buttonFourState;
    if (buttonFourState == LOW) {
      if (activeScent != 4) {
        hasPlayed = 0;
        activeScent = 4;
      } else {
        activeScent = 0;
      }
    }
  }

  // Set color based on active scent
  if (activeScent == 0) {
    setColor(0, 0, 0);
    digitalWrite(ATOMIZER_ONE, LOW);
    digitalWrite(ATOMIZER_TWO, LOW);
    digitalWrite(ATOMIZER_THREE, LOW);
    digitalWrite(ATOMIZER_FOUR, LOW);

    hasPlayed = 0;
    noTone(SPEAKER);
  } else if (activeScent == 1) {
    setColor(214, 89, 255);
    digitalWrite(ATOMIZER_TWO, LOW);
    digitalWrite(ATOMIZER_THREE, LOW);
    digitalWrite(ATOMIZER_FOUR, LOW);

    digitalWrite(ATOMIZER_ONE, HIGH);

    if (hasPlayed == 0) {
      playSound(SOUND_ONE, DURATION);
    } else {
      noTone(SPEAKER);
    }
  } else if (activeScent == 2) {
    setColor(255, 255, 0);
    digitalWrite(ATOMIZER_ONE, LOW);
    digitalWrite(ATOMIZER_THREE, LOW);
    digitalWrite(ATOMIZER_FOUR, LOW);

    digitalWrite(ATOMIZER_TWO, HIGH);

    if (hasPlayed == 0) {
      playSound(SOUND_TWO, DURATION);
    } else {
      noTone(SPEAKER);
    }
  } else if (activeScent == 3) {
    setColor(99, 200, 247);
    digitalWrite(ATOMIZER_ONE, LOW);
    digitalWrite(ATOMIZER_TWO, LOW);
    digitalWrite(ATOMIZER_FOUR, LOW);

    digitalWrite(ATOMIZER_THREE, HIGH);

    if (hasPlayed == 0) {
      playSound(SOUND_THREE, DURATION);
    } else {
      noTone(SPEAKER);
    }
  } else {
    setColor(87, 250, 141);
    digitalWrite(ATOMIZER_ONE, LOW);
    digitalWrite(ATOMIZER_TWO, LOW);
    digitalWrite(ATOMIZER_THREE, LOW);

    digitalWrite(ATOMIZER_FOUR, HIGH);

    if (hasPlayed == 0) {
      playSound(SOUND_FOUR, DURATION);
    } else {
      noTone(SPEAKER);
    }
  }
}

void setColor(int redValue, int greenValue, int blueValue) {
  for (int i = 0; i <= NUM_LEDS; i++) {
    leds[i] = CRGB(redValue * 0.25, greenValue * 0.25, blueValue * 0.25);
    FastLED.show();
  }
  FastLED.show();
}

void playSound(int melody[], int noteDurations[]) {
  for (int thisNote = 0; thisNote < SOUND_SIZE; thisNote++) {
    int noteDuration = speed * noteDurations[thisNote];
    tone(SPEAKER, melody[thisNote], noteDuration * .95);
    delay(noteDuration);
    noTone(SPEAKER);
  }
  hasPlayed = 1;
}