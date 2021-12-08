using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace MasodikBead.Persistence
{

    public class ReversiFileDataAccess
    {

        public async Task<ReversiTable> LoadAsync(String path)
        {
            using (StreamReader reader = new StreamReader(path)) // fájl megnyitása
            {
                String line = await reader.ReadLineAsync();
                String[] numbers = line.Split(' '); // beolvasunk egy sort, és a szóköz mentén széttöredezzük
                Int32 tableSize = Int32.Parse(numbers[0]); // beolvassuk a tábla méretét
                ReversiTable table = new ReversiTable(); // létrehozzuk a táblát

                table.Meret = tableSize;


                for (Int32 i = 0; i < tableSize; i++)
                {
                    line = await reader.ReadLineAsync();
                    numbers = line.Split(' ');
                    List<int> subList = new List<int>();
                    for (Int32 j = 0; j < tableSize; j++)
                    {
                        subList.Add(Int32.Parse(numbers[j]));
                    }
                    table.SetValue(subList);
                }

                return table;
            }
        }

        public async Task SaveAsync(String path, ReversiTable table)
        {
            using (StreamWriter writer = new StreamWriter(path)) // fájl megnyitása
            {
                writer.Write(table.Meret); // kiírjuk a méreteket
                await writer.WriteLineAsync();
                for (Int32 i = 0; i < table.Meret; i++)
                {
                    for (Int32 j = 0; j < table.Meret; j++)
                    {
                        await writer.WriteAsync(table.Elem(i,j) + " "); // kiírjuk az értékeket
                    }
                    await writer.WriteLineAsync();
                }
            }
        }
    }
}
