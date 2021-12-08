using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using MasodikBead.Persistence;

namespace MasodikBead.Model
{
    public class Model
    {

        private int nagyMeret = 30;
        private int kisMeret = 10;
        private int kozepMeret = 20;
        private int meretCounter = 2;
        private int passzCounter = 0;
        private int uresMezok;
        private bool elsoJatekos = true;
        private List<List<int>> _map;
        private List<int> feherBabuk;
        private List<int> feketeBabuk;
        private List<int> feketeUtheto;
        private List<int> feherValto;
        private List<int> feketeValto;
        private List<int> feherUtheto;

        private ReversiFileDataAccess _dataAccess;
        private ReversiTable _table;

        public Model()
        {
            _dataAccess = new ReversiFileDataAccess();
            _table = new ReversiTable();
        }

        public int UresMezok
        {
            get
            {
                return uresMezok;
            }
            set
            {
                uresMezok = value;
            }
        }

        public int PasszCounter
        {
            get
            {
                return passzCounter;
            }
            set
            {
                passzCounter = value;
            }
        }
        public bool ElsoJatekos
        {
            get
            {
                return elsoJatekos;
            }

            set
            {
                elsoJatekos = value;
            }
        }

        public int MeretCounter
        {
            get
            {
                switch(meretCounter)
                {
                    case 0: return this.NagyMeret;
                    case 1: return this.KozepMeret;
                    case 2: return this.KisMeret;
                    default: return this.KisMeret;

                }
                    
            }
            set
            {
                meretCounter = value;
            }
        }

        internal void AdvanceTime()
        {
            throw new NotImplementedException();
        }

        public int KozepMeret
        {
            get
            {
                return kozepMeret;
            }
            set
            {
                kozepMeret = value;
            }
        }

        public int KisMeret
        {
            get
            {
                return kisMeret;
            }
            set
            {
                kisMeret = value;
            }
        }

        public int NagyMeret
        {
            get
            {
                return nagyMeret;
            }

            set
            {
                nagyMeret = value;
            }
        }


        public void newGame_1()
        {
            if(meretCounter == 2)
            {
                 _map = new List<List<int>>();
                 feketeBabuk = new List<int>();
                 feherBabuk = new List<int>();
                 feketeUtheto = new List<int>();
                 feherUtheto = new List<int>();
                 feherValto = new List<int>();
                feketeValto = new List<int>();

                for(int i = 0; i < 10;++i)
                {
                    List<int> subList = new List<int>();
                    for (int j = 0; j < 10; ++j)
                    {
                    subList.Add(i*10 + j);
                    }
                    _map.Add(subList);

                
                }
                if (_map != null && feketeBabuk != null && feherBabuk != null)
                {
                    feketeBabuk.Add(_map[4][4]);
                    feherBabuk.Add(_map[4][5]);
                    feketeBabuk.Add(_map[5][5]);
                    feherBabuk.Add(_map[5][4]);

                }
                this.whiteReLoad();
                this.blackReLoad();

            } else if(this.meretCounter == 1)
            {
                _map = new List<List<int>>();
                feketeBabuk = new List<int>();
                feherBabuk = new List<int>();
                feketeUtheto = new List<int>();
                feherUtheto = new List<int>();
                feherValto = new List<int>();
                feketeValto = new List<int>();

                for (int i = 0; i < 20; ++i)
                {
                    List<int> subList = new List<int>();
                    for (int j = 0; j < 20; ++j)
                    {
                        subList.Add(i * 20 + j);
                    }
                    _map.Add(subList);


                }
                if (_map != null && feketeBabuk != null && feherBabuk != null)
                { 
                    feketeBabuk.Add(_map[9][9]);
                    feherBabuk.Add(_map[9][10]);
                    feketeBabuk.Add(_map[10][10]);
                    feherBabuk.Add(_map[10][9]);

                }
                this.whiteReLoad();
                this.blackReLoad();
            } else if(this.meretCounter == 0)
            {
                _map = new List<List<int>>();
                feketeBabuk = new List<int>();
                feherBabuk = new List<int>();
                feketeUtheto = new List<int>();
                feherUtheto = new List<int>();
                feherValto = new List<int>();
                feketeValto = new List<int>();

                for (int i = 0; i < 30; ++i)
                {
                    List<int> subList = new List<int>();
                    for (int j = 0; j < 30; ++j)
                    {
                        subList.Add(i * 30 + j);
                    }
                    _map.Add(subList);


                }
                if (_map != null && feketeBabuk != null && feherBabuk != null)
                {
                    feketeBabuk.Add(_map[14][14]);
                    feherBabuk.Add(_map[14][15]);
                    feketeBabuk.Add(_map[15][15]);
                    feherBabuk.Add(_map[15][14]);

                }
                this.whiteReLoad();
                this.blackReLoad();
            }
           
        }

        public void blackReLoad()
        {
            feketeValto.Clear();
            feketeUtheto.Clear();
            for (int i = 0; i < this.MeretCounter; ++i)
            {
                for (int j = 0; j < this.MeretCounter; ++j)
                {
                    if (feketeBabuk.Contains(_map[i][j]))
                    {
                        List<int> neighbors = generateNeighbors(i * this.MeretCounter + j);
                        for (int n = 0; n < 8; ++n)
                        {
                            if (feherBabuk.Contains(neighbors[n]))
                            {
                                feketeValto.Add(neighbors[n]);
                                switch (n)
                                {
                                    case 0: feketeUtheto.Add(neighbors[0] - (this.MeretCounter - 1));break;
                                    case 1: feketeUtheto.Add(neighbors[1] - (this.MeretCounter)); break;
                                    case 2: feketeUtheto.Add(neighbors[2] - (this.MeretCounter + 1)); break;
                                    case 3: feketeUtheto.Add(neighbors[3] - 1); break;
                                    case 4: feketeUtheto.Add(neighbors[4] + 1); break;
                                    case 5: feketeUtheto.Add(neighbors[5] + (this.MeretCounter - 1)); break;
                                    case 6: feketeUtheto.Add(neighbors[6] + (this.MeretCounter)); break;
                                    case 7: feketeUtheto.Add(neighbors[7] + (this.MeretCounter + 1)); break;
                                }
                            }
                        }
                    }
                }
            }
        }
        public void whiteReLoad()
        {
            feherValto.Clear();
            feherUtheto.Clear();
            for (int i = 0; i < this.MeretCounter; ++i)
            {
                for (int j = 0; j < this.MeretCounter; ++j)
                {
                    if (feherBabuk.Contains(_map[i][j]))
                    {
                        List<int> neighbors = generateNeighbors(i * this.MeretCounter + j);

                        if(neighbors != null && feketeBabuk != null)
                        {
                            for (int n = 0; n < 8; ++n)
                            {
                                if (feketeBabuk.Contains(neighbors[n]))
                                {
                                    feherValto.Add(neighbors[n]);
                                    switch (n)
                                    {
                                        case 0: feherUtheto.Add(neighbors[0] - (this.MeretCounter - 1)); break;
                                        case 1: feherUtheto.Add(neighbors[1] - (this.MeretCounter)); break;
                                        case 2: feherUtheto.Add(neighbors[2] - (this.MeretCounter + 1)); break;
                                        case 3: feherUtheto.Add(neighbors[3] - 1); break;
                                        case 4: feherUtheto.Add(neighbors[4] + 1); break;
                                        case 5: feherUtheto.Add(neighbors[5] + (this.MeretCounter - 1)); break;
                                        case 6: feherUtheto.Add(neighbors[6] + (this.MeretCounter)); break;
                                        case 7: feherUtheto.Add(neighbors[7] + (this.MeretCounter + 1)); break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        public void feherAllit(int hely)
        {
            int idx = 0;
            foreach(int szam in feherUtheto)
            {
                if(szam == hely)
                {
                    feherBabuk.Add(feherValto[idx]);
                    feketeBabuk.Remove(feherValto[idx]);
                }
                idx++;
            }
        }

        public async Task LoadGameAsync(String path)
        {
            _table = new ReversiTable();

            if (_dataAccess == null)
                throw new InvalidOperationException("No data access is provided.");

            _table = await _dataAccess.LoadAsync(path);



            switch (_table.Meret)
            {
                case 10: this.MeretCounter = 2;break;
                case 20: this.MeretCounter = 1;break;
                case 30: this.MeretCounter = 0;break;
            }

            _map.Clear();
            feketeBabuk.Clear();
            feherBabuk.Clear();

            for (int i = 0; i < this.MeretCounter; ++i)
            {
                List<int> subList = new List<int>();
                for (int j = 0; j < this.MeretCounter; ++j)
                {
                    subList.Add(i * this.MeretCounter + j);
                }
                _map.Add(subList);

            }

            for (int i = 0; i < this.MeretCounter; ++i)
            {
                for (int j = 0; j < this.MeretCounter; ++j)
                {
                    if(_table.Elem(i,j) == 1)
                    {
                        feketeBabuk.Add(_map[i][j]);
                    }
                    if(_table.Elem(i,j) == 2)
                    {
                        feherBabuk.Add(_map[i][j]);
                    }
                }
            }
            Debug.WriteLine(feketeHowMany());
            Debug.WriteLine(feherHowMany());

        }

        public async Task SaveGameAsync(String path)
        {
            if (_dataAccess == null)
                throw new InvalidOperationException("No data access is provided.");
            _table = new ReversiTable(this);
            await _dataAccess.SaveAsync(path, _table);
        }

        public void feketeAllit(int hely)
        {
            int idx = 0;
            foreach (int szam in feketeUtheto)
            {
                if(szam == hely)
                {
                    feketeBabuk.Add(feketeValto[idx]);
                    feherBabuk.Remove(feketeValto[idx]);
                }           
                idx++;
            }


        }


        private List<int> generateNeighbors(int szam)
        {
            List<int> neighbors = new List<int>();
            neighbors.Add(szam - (this.MeretCounter - 1));
            neighbors.Add(szam - this.MeretCounter);
            neighbors.Add(szam - (this.MeretCounter + 1));
            neighbors.Add(szam - 1);
            neighbors.Add(szam + 1);
            neighbors.Add(szam + (this.MeretCounter - 1));
            neighbors.Add(szam + this.MeretCounter);
            neighbors.Add(szam + (this.MeretCounter + 1));

            return neighbors;
        }

        public void feketeAdd(int x, int y)
        {
            feketeBabuk.Add(x * this.MeretCounter + y);
        }

        public void feherAdd(int x, int y)
        {
            feherBabuk.Add(x * this.MeretCounter + y);
        }

        public bool feketeUthetoIsEmpty()
        {
            if(feketeUtheto.Count == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool feherUthetoElem(int x, int y)
        {
            if (feherUtheto.Contains(_map[x][y]) && !(feherBabuk.Contains(_map[x][y])) && !(feketeBabuk.Contains(_map[x][y])))
            {
                return true;
            } else
            {
                return false;
            }
        }

        public bool feketeUthetoElem(int x, int y)
        {
            if (feketeUtheto.Contains(_map[x][y]) && !(feherBabuk.Contains(_map[x][y])) && !(feketeBabuk.Contains(_map[x][y])))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool feherUthetoIsEmpty()
        {
            if (feherUtheto.Count == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public int feketeHowMany()
        {
            return feketeBabuk.Count;
        }

        public int feherHowMany()
        {
            return feherBabuk.Count;
        }

        public bool fekete( int i, int j)
        {
            if (feketeBabuk.Contains(_map[i][j]))
            {
                Debug.WriteLine(_map[i][j]);
                return true;

            } else
            {
                return false;
            }
        }

        public bool feher(int i, int j)
        {
            if(feherBabuk.Contains(_map[i][j]))
            {
                return true;

            } else
            {
                return false;
            }
        }

    }
}
