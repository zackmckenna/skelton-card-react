export const games = [
  {
    gameName: 'seawitched',
    minPlayers: 4,
    maxPlayers: 10,
    roleDistribution: [
      {
        players: 4,
        lookout: 1,
        mutineer: 1,
        mate: 1,
        captain: 1,
        good: 1,
        evil: 1,
        deck: [
          'lookout','mutineer','mate','captain'
        ],
        alignments: [
          'good','evil'
        ]
      },
      {
        players: 5,
        lookout: 1,
        mutineer: 1,
        mate: 1,
        captain: 2,
        good: 1,
        evil: 1,
        deck: [
          'lookout','mutineer','mate','captain','captain'
        ],
        alignments: [
          'good', 'evil'
        ]
      },
      {
        players: 6,
        lookout: 1,
        mutineer: 1,
        mate: 2,
        captain: 2,
        good: 1,
        evil: 1,
        deck: [
          'lookout','mutineer','mate','mate','captain','captain'
        ],
        alignments: [
          'good', 'evil'
        ]
      },
      {
        players: 7,
        lookout: 1,
        mutineer: 1,
        mate: 3,
        captain: 2,
        good: 1,
        evil: 1,
        deck: [
          'lookout','mutineer','mate','mate','mate','captain','captain'
        ]
      },
      {
        players: 8,
        lookout: 1,
        mutineer: 2,
        mate: 3,
        captain: 2,
        good: 1,
        evil: 1,
        deck: [
          'lookout','mutineer','mutineer','mate','mate','mate','captain','captain'
        ],
        alignments: [
          'good', 'evil'
        ]
      },
      {
        players: 9,
        lookout: 1,
        mutineer: 2,
        mate: 3,
        captain: 3,
        good: 2,
        evil: 2,
        deck: [
          'lookout','mutineer','mutineer','mate','mate','mate','captain','captain','captain'
        ],
        alignments: [
          'good','good','evil','evil'
        ]
      },
      {
        players: 10,
        lookout: 1,
        mutineer: 2,
        mate: 4,
        captain: 3,
        good: 2,
        evil: 2,
        deck: [
          'lookout','mutineer','mutineer','mate','mate','mate','mate','captain','captain','captain'
        ],
        alignments: [
          'good','good','evil','evil'
        ]
      }
    ]
  },
  {
    gameName: 'traitor',
    minPlayers: 4,
    maxPlayers: 10,
    roleDistribution: {
      4: {
        keyholder: 1,
        traitor: 1,
        guard: 1,
        wizard: 1,
        good: 1,
        evil: 1
      },
      5: {
        keyholder: 1,
        traitor: 1,
        guard: 1,
        wizard: 2,
        good: 1,
        evil: 1
      },
      6: {
        keyholder: 1,
        traitor: 1,
        guard: 2,
        wizard: 2,
        good: 1,
        evil: 1
      },
      7: {
        keyholder: 1,
        traitor: 1,
        guard: 3,
        wizard: 2,
        good: 1,
        evil: 1
      },
      8: {
        keyholder: 1,
        traitor: 2,
        guard: 3,
        wizard: 2,
        good: 1,
        evil: 1
      },
      9: {
        keyholder: 1,
        traitor: 2,
        guard: 3,
        wizard: 3,
        good: 2,
        evil: 2
      },
      10: {
        keyholder: 1,
        traitor: 2,
        guard: 4,
        wizard: 3,
        good: 2,
        evil: 2
      }
    }
  },
  {
    gameName: 'werewolf',
    minPlayers: 4,
    maxPlayers: 10,
    roleDistribution: {
      3: {
        werewolves: 2,
        seer: 1,
        robber: 1,
        troublemaker: 1,
        villager: 1,
      },
      4: {
        werewolves: 2,
        seer: 1,
        robber: 1,
        troublemaker: 1,
        villager: 2,
      },
      5: {
        werewolves: 2,
        seer: 1,
        robber: 1,
        troublemaker: 1,
        villager: 3,
      }
    }
  },
  {
    gameName: 'spyfall',
    minPlayers: 3,
    maxPlayers: 12,
    locations: [
      'cemetary',
      'racetrack',
      'farm'
    ]
  }
]
