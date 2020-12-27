Feature: DuckDuckGo

Scenario: Searching DuckDuckGo

  Given I open DuckDuckGo search page
  Then the DuckDuckGo search page is displayed
  And the title is "DuckDuckGo — Privacy, simplified."

Scenario: Searching DuckDuckGo again

  Given I open DuckDuckGo search page
  Then the title is "DuckDuckGos — Privacy, simplified."
  And the DuckDuckGo search form exists