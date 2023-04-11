const states = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
    capital: 'Montgomery',
    latitude: 32,
    longitude: -86
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
    capital: 'Juneau',
    latitude: 58,
    longitude: -134
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
    capital: 'Phoenix',
    latitude: 33,
    longitude: -112
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
    capital: 'Little Rock',
    latitude: 34,
    longitude: -92
  },
  {
    name: 'California',
    abbreviation: 'CA',
    capital: 'Sacramento',
    latitude: 38,
    longitude: -121
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
    capital: 'Denver',
    latitude: 39,
    longitude: -104
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
    capital: 'Hartford',
    latitude: 41,
    longitude: -72
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
    capital: 'Dover',
    latitude: 39,
    longitude: -75
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
    capital: 'Tallahassee',
    latitude: 30,
    longitude: -84
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
    capital: 'Atlanta',
    latitude: 33,
    longitude: -84
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
    capital: 'Honolulu',
    latitude: 21,
    longitude: -157
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
    capital: 'Boise',
    latitude: 43,
    longitude: -116
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
    capital: 'Springfield',
    latitude: 39,
    longitude: -89
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
    capital: 'Indianapolis',
    latitude: 39,
    longitude: -86
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
    capital: 'Des Moines',
    latitude: 41,
    longitude: -93
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
    capital: 'Topeka',
    latitude: 39,
    longitude: -95
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
    capital: 'Frankfort',
    latitude: 38,
    longitude: -84
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
    capital: 'Baton Rouge',
    latitude: 30,
    longitude: -91
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
    capital: 'Augusta',
    latitude: 44,
    longitude: -69
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
    capital: 'Annapolis',
    latitude: 38,
    longitude: -76
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
    capital: 'Boston',
    latitude: 42,
    longitude: -71
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
    capital: 'Lansing',
    latitude: 42,
    longitude: -84
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
    capital: 'Saint Paul',
    latitude: 44,
    longitude: -93
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
    capital: 'Jackson',
    latitude: 32,
    longitude: -90
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
    capital: 'Jefferson City',
    latitude: 38,
    longitude: -92
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
    capital: 'Helena',
    latitude: 46,
    longitude: -112
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
    capital: 'Lincoln',
    latitude: 40,
    longitude: -96
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
    capital: 'Carson City',
    latitude: 39,
    longitude: -119
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
    capital: 'Concord',
    latitude: 43,
    longitude: -71
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
    capital: 'Trenton',
    latitude: 40,
    longitude: -74
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
    capital: 'Santa Fe',
    latitude: 35,
    longitude: -105
  },
  {
    name: 'New York',
    abbreviation: 'NY',
    capital: 'Albany',
    latitude: 42,
    longitude: -73
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
    capital: 'Raleigh',
    latitude: 35,
    longitude: -78
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
    capital: 'Bismarck',
    latitude: 46,
    longitude: -100
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
    capital: 'Columbus',
    latitude: 39,
    longitude: -83
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
    capital: 'Oklahoma City',
    latitude: 35,
    longitude: -97
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
    capital: 'Salem',
    latitude: 44,
    longitude: -123
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    capital: 'Harrisburg',
    latitude: 40,
    longitude: -76
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
    capital: 'Providence',
    latitude: 41,
    longitude: -71
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
    capital: 'Columbia',
    latitude: 34,
    longitude: -81
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
    capital: 'Pierre',
    latitude: 44,
    longitude: -100
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
    capital: 'Nashville',
    latitude: 36,
    longitude: -86
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
    capital: 'Austin',
    latitude: 30,
    longitude: -97
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
    capital: 'Salt Lake City',
    latitude: 39,
    longitude: -111
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
    capital: 'Montpelier',
    latitude: 44,
    longitude: -72
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
    capital: 'Richmond',
    latitude: 37,
    longitude: -77
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
    capital: 'Olympia',
    latitude: 47,
    longitude: -122
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
    capital: 'Charleston',
    latitude: 38,
    longitude: -81
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
    capital: 'Madison',
    latitude: 43,
    longitude: -89
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
    capital: 'Cheyenne',
    latitude: 41,
    longitude: -104
  }
]

module.exports = {
  states: states
}
//