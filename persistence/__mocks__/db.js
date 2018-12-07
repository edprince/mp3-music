const user = {
  _id: {
    $oid: '5c052a70c0d2d84d5b5bf611'
  },
  email: 'Marion.Stoltenberg@hotmail.com',
  password: '$2b$10$aTgnwlRUxSYQFqB3OIkLhu93tDADTctgI3kd1z9nNTwZcEMk5Ecy6',
  admin: true
};

const playlists = [
  {
    _id: {
      $oid: '5bfdfa9afb6fc006ff2694b9'
    },
    userId: '5bfc382b8bd7f145fbc14a6b',
    title: 'Chillout',
    public: 'true',
    photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Ghost_%28The_Devin_Townsend_Project_album%29_cover.jpg/220px-Ghost_%28The_Devin_Townsend_Project_album%29_cover.jpg',
    songs: [
      'sfo2.digitaloceanspaces.com/princee3-music/Deadmau5_-_gg-JAB1rxKlTcU (1).mp3',
      'https://princee3-music.sfo2.digitaloceanspaces.com/test.mp3'
    ]
  }, {
    _id: {
      $oid: '5bfdfb3dfb6fc006ff26951f'
    },
    userId: '5bfc382b8bd7f145fbc14a6b',
    title: 'Electronic',
    public: 'true',
    photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/85/Deadmau5_4x4%3D12.jpg/220px-Deadmau5_4x4%3D12.jpg',
    songs: [
      'https://princee3-music.sfo2.digitaloceanspaces.com/electro.opus',
      'sfo2.digitaloceanspaces.com/princee3-music/Deadmau5_-_gg-JAB1rxKlTcU (1).mp3',
      'sfo2.digitaloceanspaces.com/princee3-music/deadmau5.mp3',
      'sfo2.digitaloceanspaces.com/princee3-music/Hozier - From Eden (Grayson Erhard Cover) (320  kbps).mp3'
    ]
  }
];

const playlist = {
  _id: {
    $oid: '5bfdfb3dfb6fc006ff26951f'
  },
  userId: '5bfc382b8bd7f145fbc14a6b',
  title: 'Electronic',
  public: 'true',
  photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/85/Deadmau5_4x4%3D12.jpg/220px-Deadmau5_4x4%3D12.jpg',
  songs: [
    'https://princee3-music.sfo2.digitaloceanspaces.com/electro.opus',
    'sfo2.digitaloceanspaces.com/princee3-music/Deadmau5_-_gg-JAB1rxKlTcU (1).mp3',
    'sfo2.digitaloceanspaces.com/princee3-music/deadmau5.mp3',
    'sfo2.digitaloceanspaces.com/princee3-music/Hozier - From Eden (Grayson Erhard Cover) (320  kbps).mp3'
  ]
};

exports.registerUser = async(user, db) => user;

exports.uploadSong = async(file) => new Promise((resolve, reject) => {
  console.log(file.path);
  if (typeof file.path !== 'string') {
    reject({err: 'Not string path'});
  } else {
    resolve({response: 'RESULT'});
  }
});

exports.updatePlaylistWithSong = async(url, id, db) => playlist;

exports.getAllPlaylists = async(id, db) => playlists;

exports.getPlaylist = async(id, db) => playlist;

exports.savePlaylist = async(playlist, db) =>
  //Playlist that's been inserted
  playlist
;

exports.checkUserExists = async(user, db) => user;

exports.connect = () => true;
