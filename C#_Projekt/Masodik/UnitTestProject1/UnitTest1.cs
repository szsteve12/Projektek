using Microsoft.VisualStudio.TestTools.UnitTesting;
using MasodikBead.Model;

namespace ReversiTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void FeketeFeherAlapElemek()
        {
            Model model = new Model();
            model.MeretCounter = 2;
            model.newGame_1();
            Assert.AreEqual(model.fekete(4, 4), true);
            Assert.AreEqual(model.feher(4, 5), true);
        }

        [TestMethod]
        public void FeketeFeherNemElemek()
        {
            Model model = new Model();
            model.MeretCounter = 2;
            model.newGame_1();
            Assert.AreEqual(model.fekete(9, 5), false);
            Assert.AreEqual(model.feher(7, 4), false);
        }

        [TestMethod]

        public void FeketeUtehtoElemek()
        {
            Model model = new Model();
            model.MeretCounter = 2;
            model.newGame_1();
            model.blackReLoad();
            Assert.AreEqual(model.feketeUthetoIsEmpty(), false);
        }

        [TestMethod]

        public void AddMethod()
        {
            Model model = new Model();
            model.MeretCounter = 2;
            model.newGame_1();
            model.blackReLoad();

            model.feketeAdd(4, 6);
            model.feketeAllit(4 * model.MeretCounter + 6);

            Assert.AreEqual(model.feher(4, 5), false);
            Assert.AreEqual(model.fekete(4, 6), true);
            Assert.AreEqual(model.fekete(4, 5), true);

        }
    }
}
