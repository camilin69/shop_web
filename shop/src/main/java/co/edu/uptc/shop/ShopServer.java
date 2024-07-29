package co.edu.uptc.shop;

import java.io.*;

import co.edu.uptc.shop.logic.HandlingUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import com.google.gson.Gson;
import jakarta.servlet.annotation.*;

@WebServlet(name = "shopserver", value = "/shop-server")
public class ShopServer extends HttpServlet {
    private HandlingUser handlingUser;

    public void init() {
        handlingUser = new HandlingUser();

    }

    public void setup(){
        handlingUser.addUser(1, "A", "123", "Cami", "432432");
        handlingUser.addUser(2, "B", "123", "dsadsa", "455666");
        handlingUser.addUser(3, "C", "123", "thgfhg", "777777");
        handlingUser.addUser(4, "D", "123", "hhhhhh", "888888");
        handlingUser.addUser(5, "E", "123", "mnbgjh", "999999");

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setup();
        Gson gson = new Gson();

        response.setContentType("application/html");
        try(PrintWriter out = response.getWriter()){
            out.println(gson.toJson( handlingUser.getUsers() ));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();

        // Get the parameters from the request
        String idStr = request.getParameter("id");
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");

        int id = Integer.parseInt(idStr);

        handlingUser.addUser(id, name, password, email, phone);

        try (PrintWriter out = response.getWriter()) {
            out.println(gson.toJson(handlingUser.getUsers()));
        }
    }

}