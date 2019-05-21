public  class PenFactory {
   public static Pen create(String str) {
        Pen tempPen = null;
         if(str != null) {
             if(str =='') {
                 tempPen = new Pencil();
             } else {
                 tempPen = new GelPen();
             }
         }
         return tempPen;
	}
}