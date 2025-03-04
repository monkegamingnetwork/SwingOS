const appstoreToggle = document.getElementById("appstoretoggle");
const appstore = document.getElementById("appstore");

let isAppStoreVisible = false;

function showAppStore() {
  appstore.style.display = "block";
  isAppStoreVisible = true;
  setTimeout(() => {
    document.addEventListener("click", hideAppStoreOnClickOutside);
  }, 0);
}

function hideAppStore() {
  appstore.style.display = "none";
  isAppStoreVisible = false;
  document.removeEventListener("click", hideAppStoreOnClickOutside);
}

function toggleAppStore() {
  if (!isAppStoreVisible) {
    showAppStore();
  }
}


appstoreToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAppStore();
});

function hideAppStoreOnClickOutside(event) {
  if (isAppStoreVisible && !appstore.contains(event.target) && event.target !== appstoreToggle) {
    hideAppStore();
  }
}

const config = [
  {
    imageSrc: '/media/icons/notes.png',
    title: 'Notes',
    description: 'It\'s just a notes app... do I really need to explain everything?',
    function1: () => {
      const notesApp = `
          <iframe src="/system/apps/notes/index.html" frameborder="0" style="width: 100%; height: 100%; border: none; margin: none;"></iframe>
        `
      const notes = {
        id: 5,
        imageSrc: '/media/icons/notes.png',
        text: 'Notes',
        clickFunction: function() {
          createWindow('Notes', notesApp, '70%', '60%');
        }
      };
      createApp(notes);
      console.log('Successfully installed the app "Notes" with the ID of "5".');
    },
    function2: () => {
      removeAppById(5);
      console.log('Successfully uninstalled the app "Notes" with the ID of "5".');
    },
    buttonTexts: ['Install Notes', 'Uninstall Notes']
  },
  {
    imageSrc: '/media/icons/meowie.png',
    title: 'MONKE Gaming V3',
    description: 'Third Generation of MG.',
    function1: () => {
      const meowie = `
          <iframe src="https://monkegaminghtml.netlify.app/index2.html" frameborder="0" style="width: 100%; height: 100%; border: none; margin: none;"></iframe>
        `
      const meowieGames = {
        id: 6,
        imageSrc: '/media/icons/meowie.png',
        text: 'Meowzie\'s Adventures',
        clickFunction: function() {
          createWindow('MONKE Gaming V3', meowie, '60%', '70%');
        }
      };
      createApp(meowieGames);
      console.log('Successfully installed the app "MONKE Gaming V3" with the ID of "6".');
    },
    function2: () => {
      removeAppById(6);
      console.log('Successfully uninstalled the app "MONKE Gaming V3" with the ID of "6".');
    },
    buttonTexts: ['Install App', 'Uninstall App']
    },
    {
        imageSrc: '/media/icons/music.png',
        title: 'Music',
        description: 'jam out like a monkey',
        function1: () => {
            const musicApp = `
          <iframe src="https://bemusic.1.vebto.com/" frameborder="0" style="width: 100%; height: 100%; border: none; margin: none;"></iframe>
        `
            const music = {
                id: 7,
                imageSrc: '/media/icons/music.png',
                text: 'Music',
                clickFunction: function () {
                    createWindow('Music', musicApp, '70%', '60%');
                }
            };
            createApp(music);
            console.log('Successfully installed the app "Music" with the ID of "7".');
        },
        function2: () => {
            removeAppById(7);
            console.log('Successfully uninstalled the app "Music" with the ID of "7".');
        },
        buttonTexts: ['Install Music', 'Uninstall Music']
    },
];

const rowsContainer = document.getElementById('rows');

config.forEach((item, index) => {
  const row = document.createElement('div');
  row.classList.add('row');

  const image = document.createElement('img');
  image.src = item.imageSrc;
  image.alt = `Image ${index + 1}`;
  image.classList.add('image');
  row.appendChild(image);

  const info = document.createElement('div');
  info.classList.add('info');

  const title = document.createElement('h2');
  title.textContent = item.title;
  info.appendChild(title);

  const description = document.createElement('p');
  description.textContent = item.description;
  info.appendChild(description);

  const button = document.createElement('button');
  button.textContent = item.buttonTexts[0];
  button.classList.add('appstorebtn');
  let functionIndex = 1;
  let isLoading = false;

  button.addEventListener('click', () => {
    if (!isLoading) {
      if (functionIndex === 1) {
        isLoading = true;
        button.textContent = 'Installing app, please wait...';
        setTimeout(() => {
          item.function1();
          button.textContent = item.buttonTexts[1];
          isLoading = false;
        }, 2000);

      } else if (functionIndex === 2) {
        isLoading = true;
        button.textContent = 'Uninstalling app, please wait...';
        setTimeout(() => {
          item.function2();
          button.textContent = item.buttonTexts[0];
          isLoading = false;
        }, 1000);
      }
      functionIndex = functionIndex === 1 ? 2 : 1;
    }
  });

  info.appendChild(button);
  row.appendChild(info);
  rowsContainer.appendChild(row);
});

