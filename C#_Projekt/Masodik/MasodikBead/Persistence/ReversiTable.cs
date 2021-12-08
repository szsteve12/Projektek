using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;

namespace MasodikBead.Persistence
{
    public class ReversiTable
    {
        private int meret;
        List<List<int>> tabla;

        public int Meret
        {
            get
            {
                return meret;
            }
            set
            {
                meret = value;
            }
        }

        public ReversiTable( Model.Model _model)
        {
            tabla = new List<List<int>>();
            meret = _model.MeretCounter;
            for(int i = 0; i < meret; ++i)
            {
                List<int> subList = new List<int>();
                for (int j = 0; j < meret; ++j)
                {
                    if (_model.fekete(i,j))
                    {
                        subList.Add(1);
                    }else if(_model.feher(i,j))
                    {
                        subList.Add(2);
                    } else
                    {
                        subList.Add(0);
                    }
                }
                tabla.Add(subList);
            }

            Debug.WriteLine(tabla[4][4]);
        }

        public ReversiTable()
        {
            tabla = new List<List<int>>();

        }

        public int Elem(int i,int j)
        {
            return this.tabla[i][j];
        }

        public void SetValue(List<int> subList)
        {
            tabla.Add(subList);
        }

    }
}
