using MasodikBead.Model;
using MasodikBead;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Diagnostics;
using System.Timers;
using System.Collections.ObjectModel;
using Microsoft.Win32;
using System.Windows;

namespace MasodikBead.ViewModel
{
    class ReversiViewModel : ViewModelBase
    {
    public DelegateCommand NewGameCommand { get; private set; }
    public DelegateCommand KonnyuJatekCommand { get; private set; }
    public DelegateCommand NehezJatekCommand { get; private set; }
    public DelegateCommand KozepesJatekCommand { get; private set; }

    /// <summary>
    /// Játék betöltése parancs lekérdezése.
    /// </summary>
    public DelegateCommand LoadGameCommand { get; private set; }

    /// <summary>
    /// Játék mentése parancs lekérdezése.
    /// </summary>
    public DelegateCommand SaveGameCommand { get; private set; }

    public DelegateCommand PasszCommand { get; private set; }

        /// <summary>
        /// Kilépés parancs lekérdezése.
        /// </summary>
        public DelegateCommand ExitCommand { get; private set; }

    private Model.Model _model;
    private int ElsoJatekido = 0;
    private int MasodikJatekido = 0;
    System.Timers.Timer aTimer;
    private bool elsoMegallit = true;
    private int elsoCount = 0;
    private int masodikCount = 0;

    public ObservableCollection<ReversiField> Fields { get; set; }
    public ReversiViewModel(MasodikBead.Model.Model model)
    {
        _model = model;
        aTimer = new System.Timers.Timer(1000);
        aTimer.AutoReset = true;
        aTimer.Enabled = true;
        aTimer.Elapsed -= Add;
        aTimer.Elapsed += Add;

        PasszCommand = new DelegateCommand(param => OnPassz());
        NewGameCommand = new DelegateCommand(param => OnNewGame() );
        LoadGameCommand = new DelegateCommand(param => OnLoadGame());
        SaveGameCommand = new DelegateCommand(param => OnSaveGame());
        ExitCommand = new DelegateCommand(param => OnExitGame());
        NehezJatekCommand = new DelegateCommand(param => OnNehezJatek());
        KonnyuJatekCommand = new DelegateCommand(param => OnKonnyuJatek());
        KozepesJatekCommand = new DelegateCommand(param => OnKozepesJatek());



            Fields = new ObservableCollection<ReversiField>();
            for (Int32 i = 0; i < _model.MeretCounter; i++) // inicializáljuk a mezőket
            {
                for (Int32 j = 0; j < _model.MeretCounter; j++)
                {
                    Fields.Add(new ReversiField
                    {
                        Szin = "Red",
                        IsLocked = false,
                        X = i,
                        Y = j,
                        Number = i * _model.MeretCounter + j, // a gomb sorszáma, amelyet felhasználunk az azonosításhoz
                        StepCommand = new DelegateCommand(param => StepGame(Convert.ToInt32(param)))
                        // ha egy mezőre léptek, akkor jelezzük a léptetést, változtatjuk a lépésszámot
                    });
                }
            }
            Fields[Fields.Count / 2 - 6].Szin = "Black";
            Fields[Fields.Count / 2 + 1 - 6].Szin = "White";
            Fields[Fields.Count / 2 + 10 - 6].Szin = " White";
            Fields[Fields.Count / 2 + 11 - 6].Szin = "Black";


        }

        public int ElsoCount
        {
            get
            {
                return elsoCount;
            }
            set
            {
                elsoCount = value;
            }
        }

        public int MasodikCount
        {
            get
            {
                return masodikCount;
            }
            set
            {
                masodikCount = value;
            }
        }

        private void Add(object sender, ElapsedEventArgs e)
        {
            if (_model.ElsoJatekos == true)
            {
                ElsoCount += 1;
                OnPropertyChanged("ElsoCount");

            }
            else
            {
                MasodikCount += 1;
                OnPropertyChanged("MasodikCount");
            }
        }

        private void StepGame(Int32 index)
        {
            int x = Fields[index].X;
            int y = Fields[index].Y;


            if (_model.ElsoJatekos == true && _model.feherUthetoElem(x,y))
            {
                Fields[index].Szin = "White";
                _model.PasszCounter = 0;
                _model.feherAdd(x, y);
                _model.feherAllit(x * _model.MeretCounter + y);
                _model.ElsoJatekos = false;
                _model.whiteReLoad();
                _model.blackReLoad();
                /*if (_model.feherUthetoIsEmpty())
                {
                    this.passzButton_Click(this, e);
                }
                if (_model.feketeUthetoIsEmpty() && _model.feherUthetoIsEmpty())
                {
                    vege();
                }*/
            }
            else if (_model.ElsoJatekos == false && _model.feketeUthetoElem(x,y))
            {
                Fields[index].Szin = "Black";
                _model.PasszCounter = 0;
                _model.feketeAdd(x, y);
                _model.feketeAllit(x * _model.MeretCounter + y);
                _model.ElsoJatekos = true;
                _model.blackReLoad();
                _model.whiteReLoad();
                /*if (_model.feketeUthetoIsEmpty())
                {
                    this.passzButton_Click(this, e);
                }
                if (_model.feketeUthetoIsEmpty() && _model.feherUthetoIsEmpty())
                {
                    vege();
                }
                else
                {
                    _model.BlockNoneWhiteButtons();
                }*/


            }
            ObservableCollection<ReversiField> fields = new ObservableCollection<ReversiField>();
            for (Int32 i = 0; i < _model.MeretCounter; i++) // inicializáljuk a mezőket
            {
                for (Int32 j = 0; j < _model.MeretCounter; j++)
                {

                    if (_model.fekete(i, j))
                    {
                        fields.Add(new ReversiField
                        {
                            Szin = "Black",
                            IsLocked = false,
                            X = i,
                            Y = j,
                            Number = i * _model.MeretCounter + j, // a gomb sorszáma, amelyet felhasználunk az azonosításhoz
                            StepCommand = new DelegateCommand(param => StepGame(Convert.ToInt32(param)))
                            // ha egy mezőre léptek, akkor jelezzük a léptetést, változtatjuk a lépésszámot
                        });
                    }
                    else
                    if (_model.feher(i, j))
                    {
                        fields.Add(new ReversiField
                        {
                            Szin = "White",
                            IsLocked = false,
                            X = i,
                            Y = j,
                            Number = i * _model.MeretCounter + j, // a gomb sorszáma, amelyet felhasználunk az azonosításhoz
                            StepCommand = new DelegateCommand(param => StepGame(Convert.ToInt32(param)))
                            // ha egy mezőre léptek, akkor jelezzük a léptetést, változtatjuk a lépésszámot
                        });
                    }
                    else
                    {
                        fields.Add(new ReversiField
                        {
                            Szin = "Red",
                            IsLocked = false,
                            X = i,
                            Y = j,
                            Number = i * _model.MeretCounter + j, // a gomb sorszáma, amelyet felhasználunk az azonosításhoz
                            StepCommand = new DelegateCommand(param => StepGame(Convert.ToInt32(param)))
                            // ha egy mezőre léptek, akkor jelezzük a léptetést, változtatjuk a lépésszámot
                        });
                    }
                }
            }
                Fields = fields;
                OnPropertyChanged("Fields");

        }
        private void vege()
        {
           
        }

        public event EventHandler NewGame;
        public event EventHandler NehezJatek;
        public event EventHandler KonnyuJatek;
        public event EventHandler KozepesJatek;

        /// <summary>
        /// Játék betöltésének eseménye.
        /// </summary>
        public event EventHandler LoadGame;

        /// <summary>
        /// Játék mentésének eseménye.
        /// </summary>
        public event EventHandler SaveGame;

        /// <summary>
        /// Játékból való kilépés eseménye.
        /// </summary>
        public event EventHandler ExitGame;

        public event EventHandler Passz;

        private void OnNewGame()
        {
            if (NewGame != null)
                NewGame(this, EventArgs.Empty);
        }

        private void OnPassz()
        {
            if(Passz != null)
            {
                Passz(this, EventArgs.Empty);
            }
        }

        private void OnKozepesJatek()
        {
            if(KozepesJatek != null)
            {
                KozepesJatek(this, EventArgs.Empty);
            }
        }

        private void OnKonnyuJatek()
        {
            if (KonnyuJatek != null)
            {
                KonnyuJatek(this, EventArgs.Empty);
            }
        }

        private void OnNehezJatek()
        {
            if (NehezJatek != null)
            {
                NehezJatek(this, EventArgs.Empty);
            }
        }



        /// <summary>
        /// Játék betöltése eseménykiváltása.
        /// </summary>
        private void OnLoadGame()
        {
            if (LoadGame != null)
                LoadGame(this, EventArgs.Empty);
        }

        /// <summary>
        /// Játék mentése eseménykiváltása.
        /// </summary>
        private void OnSaveGame()
        {
            if (SaveGame != null)
                SaveGame(this, EventArgs.Empty);
        }

        /// <summary>
        /// Játékból való kilépés eseménykiváltása.
        /// </summary>
        private void OnExitGame()
        {
            if (ExitGame != null)
                ExitGame(this, EventArgs.Empty);
        }

        public void Frissit()
        {
            ObservableCollection<ReversiField> fields = new ObservableCollection<ReversiField>();
            for (Int32 i = 0; i < _model.MeretCounter; i++) // inicializáljuk a mezőket
            {
                for (Int32 j = 0; j < _model.MeretCounter; j++)
                {

                    if (_model.fekete(i, j))
                    {
                        fields.Add(new ReversiField
                        {
                            Szin = "Black",
                            IsLocked = false,
                            X = i,
                            Y = j,
                            Number = i * _model.MeretCounter + j, // a gomb sorszáma, amelyet felhasználunk az azonosításhoz
                            StepCommand = new DelegateCommand(param => StepGame(Convert.ToInt32(param)))
                            // ha egy mezőre léptek, akkor jelezzük a léptetést, változtatjuk a lépésszámot
                        });
                    }
                    else
                    if (_model.feher(i, j))
                    {
                        fields.Add(new ReversiField
                        {
                            Szin = "White",
                            IsLocked = false,
                            X = i,
                            Y = j,
                            Number = i * _model.MeretCounter + j, // a gomb sorszáma, amelyet felhasználunk az azonosításhoz
                            StepCommand = new DelegateCommand(param => StepGame(Convert.ToInt32(param)))
                            // ha egy mezőre léptek, akkor jelezzük a léptetést, változtatjuk a lépésszámot
                        });
                    }
                    else
                    {
                        fields.Add(new ReversiField
                        {
                            Szin = "Red",
                            IsLocked = false,
                            X = i,
                            Y = j,
                            Number = i * _model.MeretCounter + j, // a gomb sorszáma, amelyet felhasználunk az azonosításhoz
                            StepCommand = new DelegateCommand(param => StepGame(Convert.ToInt32(param)))
                            // ha egy mezőre léptek, akkor jelezzük a léptetést, változtatjuk a lépésszámot
                        });
                    }
                }
            }
            Fields = fields;
            OnPropertyChanged("Fields");

        }
        /*private void Elso_Load(object sender, EventArgs e)
        {
            _model = new Model.Model();
            this._menuUjjatekKicsi.Click += UjjatekKicsi;
            this._menuUjjatekKozepes.Click += UjjatekKozepes;
            this._menuUjjatekNagy.Click += UjjatekNagy;
            this._menuBeallitoMegallit.Click += Megallit;
            this._menuBeallitoUjjatek.Click += UjJatek_1;
            GenerateTabel();
            _model.Szinez += Szinez;
            _model.Blocker += Blocker;
            _model.newGame_1();
            this._menuBeallitoBetoltes.Click += MenuFileLoadGame_Click;
            this._menuBeallitoMentes.Click += MenuFileSaveGame_Click;
        }

        private void UjjatekNagy()
        {
            _model.MeretCounter = 0;
            aTimer.Stop();
            this.panel1.Controls.Clear();
            GenerateTabel();
            _model.newGame_1();
            _model.ElsoJatekos = true;
            this.ElsoJatekido = 0;
            this.MasodikJatekido = 0;
            _statusBarElsoJatekido.Text = "0";
            _statusBarMasodikJatekido.Text = "0";
        }

        private void UjjatekKozepes()
        {
            _model.MeretCounter = 1;
            aTimer.Stop();
            this.panel1.Controls.Clear();
            GenerateTabel();
            _model.newGame_1();
            _model.ElsoJatekos = true;
            this.ElsoJatekido = 0;
            this.MasodikJatekido = 0;
            _statusBarElsoJatekido.Text = "0";
            _statusBarMasodikJatekido.Text = "0";
        }

        private void UjjatekKicsi()
        {
            _model.MeretCounter = 2;
            aTimer.Stop();
            this.panel1.Controls.Clear();
            GenerateTabel();
            _model.newGame_1();
            _model.ElsoJatekos = true;
            this.ElsoJatekido = 0;
            this.MasodikJatekido = 0;
            _statusBarElsoJatekido.Text = "0";
            _statusBarMasodikJatekido.Text = "0";
        }

        private void UjJatek_1()
        {
            aTimer.Stop();
            this.panel1.Controls.Clear();
            GenerateTabel();
            _model.newGame_1();
            _model.ElsoJatekos = true;
            this.ElsoJatekido = 0;
            this.MasodikJatekido = 0;
            _statusBarElsoJatekido.Text = "0";
            _statusBarMasodikJatekido.Text = "0";


        }
        /*private void Add(object sender, ElapsedEventArgs e)
        {
            if (_model.ElsoJatekos == true)
            {
                ElsoJatekido += 1;
                this._statusBarElsoJatekido.Text = ElsoJatekido.ToString();
            }
            else
            {
                MasodikJatekido += 1;
                this._statusBarMasodikJatekido.Text = MasodikJatekido.ToString();
            }
        }



            private void Megallit(object sender, EventArgs e)
            {
                if (elsoMegallit == true)
                {
                    aTimer.Stop();
                    _menuBeallitoMegallit.Text = "Elindit";
                    elsoMegallit = false;
                }
                else
                {
                    _menuBeallitoMegallit.Text = "Megallit";
                    aTimer.Start();
                    elsoMegallit = true;
                }
            }

            private void Blocker(object sender, int e)
            {
                int x = e / _model.MeretCounter;
                int y = e % _model.MeretCounter;

                _buttonGrid[x, y].Enabled = false;


            }

            private void Szinez(object sender, szinezEventArgs e)
            {
                int x = e.Hely / _model.MeretCounter;
                int y = e.Hely % _model.MeretCounter;

                if (e.Szin == "feher")
                {
                    _buttonGrid[x, y].BackColor = Color.White;
                }
                else if (e.Szin == "fekete")
                {
                    _buttonGrid[x, y].BackColor = Color.Black;
                }

            }

            private void unLockButtons()
            {
                for (int i = 0; i < _model.MeretCounter; ++i)
                {
                    for (int j = 0; j < _model.MeretCounter; ++j)
                    {
                        _buttonGrid[i, j].Enabled = true;
                    }
                }
            }

            private async void MenuFileLoadGame_Click(Object sender, EventArgs e)
            {
                if (_openFileDialog.ShowDialog() == DialogResult.OK) // ha kiválasztottunk egy fájlt
                {
                    // játék betöltése
                    await _model.LoadGameAsync(_openFileDialog.FileName);
                    _menuBeallitoBetoltes.Enabled = true;
                    aTimer.Stop();
                    this.panel1.Controls.Clear();
                    GenerateTabel();
                    for (int i = 0; i < _model.MeretCounter; ++i)
                    {
                        for (int j = 0; j < _model.MeretCounter; ++j)
                        {
                            if (_model.fekete(i, j))
                            {
                                _buttonGrid[i, j].BackColor = Color.Black;
                            }
                            else if (_model.feher(i, j))
                            {
                                _buttonGrid[i, j].BackColor = Color.White;
                            }
                        }
                    }
                    Debug.WriteLine(_model.feherHowMany());

                    _model.ElsoJatekos = true;
                    _model.whiteReLoad();
                    _model.blackReLoad();
                    _model.BlockNoneWhiteButtons();
                    this.ElsoJatekido = 0;
                    this.MasodikJatekido = 0;
                    _statusBarElsoJatekido.Text = "0";
                    _statusBarMasodikJatekido.Text = "0";

                }

            }
            private async void MenuFileSaveGame_Click(Object sender, EventArgs e)
            {
                Boolean restartTimer = aTimer.Enabled;
                aTimer.Stop();

                if (_saveFileDialog.ShowDialog() == DialogResult.OK)
                {
                    // játé mentése
                    await _model.SaveGameAsync(_saveFileDialog.FileName);
                }

                if (restartTimer)
                    aTimer.Start();
            }
            }
            }*/
    }
}
