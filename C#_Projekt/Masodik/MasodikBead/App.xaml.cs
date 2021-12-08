using System;
using System.ComponentModel;
using System.Windows;
using System.Windows.Threading;
using MasodikBead.Model;
using MasodikBead.Persistence;
using MasodikBead.ViewModel;
using Microsoft.Win32;

namespace MasodikBead
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        #region Fields

        private Model.Model _model;
        private ReversiViewModel _viewModel;
        private MasodikBead.MainWindow _view;
        

        #endregion

        #region Constructors

        /// <summary>
        /// Alkalmazás példányosítása.
        /// </summary>
        public App()
        {
            Startup += new StartupEventHandler(App_Startup);
        }

        #endregion

        #region Application event handlers

        private void App_Startup(object sender, StartupEventArgs e)
        {
            // modell létrehozása
            _model = new Model.Model();
            _model.newGame_1();

            // nézemodell létrehozása
            _viewModel = new ReversiViewModel(_model);
            _viewModel.NewGame += new EventHandler(ViewModel_NewGame);
            _viewModel.ExitGame += new EventHandler(ViewModel_ExitGame);
            _viewModel.LoadGame += new EventHandler(ViewModel_LoadGame);
            _viewModel.SaveGame += new EventHandler(ViewModel_SaveGame);
            _viewModel.Passz += new EventHandler(ViewModel_Passz);
            _viewModel.KonnyuJatek += new EventHandler(ViewModel_KonnyuJatek);
            _viewModel.KozepesJatek += new EventHandler(ViewModel_KozepesJatek);
            _viewModel.NehezJatek += new EventHandler(ViewModel_NehezJatek);


            // nézet létrehozása
            _view = new MainWindow();
            _view.DataContext = _viewModel;
            //_view.Closing += new System.ComponentModel.CancelEventHandler(View_Closing); // eseménykezelés a bezáráshoz
            _view.Show();

        }

        private void ViewModel_NehezJatek(object sender, EventArgs e)
        {
            _model.MeretCounter = 0;
            _model.newGame_1();
            _viewModel.Frissit();
        }

        private void ViewModel_KozepesJatek(object sender, EventArgs e)
        {
            _model.MeretCounter = 1;
            _model.newGame_1();
            _viewModel.Frissit();
        }

        private void ViewModel_KonnyuJatek(object sender, EventArgs e)
        {
            _model.MeretCounter = 2;
            _model.newGame_1();
            _viewModel.Frissit();
        }

        private void ViewModel_Passz(object sender, EventArgs e)
        {
            _model.PasszCounter += 1;
            if (_model.PasszCounter != 2)
            {
                if (_model.ElsoJatekos == true)
                {
                    _model.blackReLoad();
                    _model.whiteReLoad();
                    _model.ElsoJatekos = false;
                }
                else if (_model.ElsoJatekos == false)
                {
                    _model.blackReLoad();
                    _model.whiteReLoad();
                    _model.ElsoJatekos = true;
                }
            }
            else
            {
                this.ViewModel_ExitGame(this, EventArgs.Empty);
            }
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            _model.AdvanceTime();
        }

        #endregion

        #region View event handlers

        /// <summary>
        /// Nézet bezárásának eseménykezelője.
        /// </summary>
        private void View_Closing(object sender, CancelEventArgs e)
        {

            if (MessageBox.Show("Biztos, hogy ki akar lépni?", "Sudoku", MessageBoxButton.YesNo, MessageBoxImage.Question) == MessageBoxResult.No)
            {
                e.Cancel = true; // töröljük a bezárást
            }
        }

        #endregion

        #region ViewModel event handlers

        /// <summary>
        /// Új játék indításának eseménykezelője.
        /// </summary>
        private void ViewModel_NewGame(object sender, EventArgs e)
        {
            _model.newGame_1();
        }

        /// <summary>
        /// Játék betöltésének eseménykezelője.
        /// </summary>
        private async void ViewModel_LoadGame(object sender, System.EventArgs e)
        {
            // játék betöltése
            OpenFileDialog openFileDialog = new OpenFileDialog(); // dialógusablak
            openFileDialog.Title = "Reversi tábla betöltése";
            openFileDialog.Filter = "Reversi tabla|*.stl";
            if (openFileDialog.ShowDialog() == true) // ha kiválasztottunk egy fájlt
            {
                // játék betöltése
                await _model.LoadGameAsync(openFileDialog.FileName);
                _viewModel.Frissit();
                _model.ElsoJatekos = true;
                _model.whiteReLoad();
                _model.blackReLoad();
            }

        }

        /// <summary>
        /// Játék mentésének eseménykezelője.
        /// </summary>
        private async void ViewModel_SaveGame(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog = new SaveFileDialog(); // dialógablak
            saveFileDialog.Title = "Reversi tábla betöltése";
            saveFileDialog.Filter = "Reversi tabla|*.stl";
            if (saveFileDialog.ShowDialog() == true)
            {
                await _model.SaveGameAsync(saveFileDialog.FileName);
            }
        }

        /// <summary>
        /// Játékból való kilépés eseménykezelője.
        /// </summary>
        private void ViewModel_ExitGame(object sender, System.EventArgs e)
        {
            if (_model.feketeHowMany() > _model.feherHowMany())
            {
                string message = "A gyoztes a Fekete Jatekos, szeretnel kilepni a programbol?";
                MessageBoxResult result = MessageBox.Show(message, "My App", MessageBoxButton.YesNo);
                switch (result)
                {
                    case MessageBoxResult.Yes:
                        System.Windows.Application.Current.Shutdown();
                        break;
                    case MessageBoxResult.No:
                        MessageBox.Show("Ezestben a program ujra indul, alap allapotbol", "My App");
                        _model.newGame_1();
                        _viewModel.Frissit();
                        break;
                }
            }
            else if (_model.feherHowMany() == _model.feketeHowMany())
            {
                string message = "A jatek dontetlen";
                MessageBoxResult result = MessageBox.Show(message, "My App", MessageBoxButton.YesNo);
                switch (result)
                {
                    case MessageBoxResult.Yes:
                        System.Windows.Application.Current.Shutdown();
                        break;
                    case MessageBoxResult.No:
                        MessageBox.Show("Ezestben a program ujra indul, alap allapotbol", "My App");
                        _model.newGame_1();
                        _viewModel.Frissit();
                        break;
                }
            }
            else
            {
                string message = "A gyoztes a Feher Jatekos";

                MessageBoxResult result = MessageBox.Show(message, "My App", MessageBoxButton.YesNo);
                switch (result)
                {
                    case MessageBoxResult.Yes:
                        System.Windows.Application.Current.Shutdown();
                        break;
                    case MessageBoxResult.No:
                        MessageBox.Show("Ezestben a program ujra indul, alap allapotbol", "My App");
                        _model.newGame_1();
                        _viewModel.Frissit();
                        break;
                }
            }


        }

        #endregion

        #region Model event handlers

        /// <summary>
        /// Játék végének eseménykezelője.
        /// </summary>
        #endregion
    }
}
