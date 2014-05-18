/**
 * Created by lukas on 5/18/14.
 */
//Passt die Höhe der textareas beim HInzufügen einer Veranstaltung dem Text an
function textAreaAdjust(o) {
  o.style.height = "0px";
  o.style.height = (o.scrollHeight)+"px";
}
