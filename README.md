# OverTheLimits
Neural network AI for UnderTheLimits

OverTheLimits aims to create a chat-bot to interact with the online game "UnderTheLimit" (https://github.com/Thenkei/UnderTheLimits). Developped in C++.

## First Phase : Basic AI

The first phase will provide a chat-bot capable to select the best card inside his hand. We records maximum of data for future uses, but the training process will only take into account the combination of the winning card with the question.
- It will only record one choice questions
- It will records the combination [ID_QUESTION;ID_WINNING_CARD]
- It will also records the raw data [ID_QUESTION;{ID_PLAYER_HAND1,..};ID_OTHER_ANSWERS]
- Those records will be saved into two different databases
-
