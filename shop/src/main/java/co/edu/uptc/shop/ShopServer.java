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
        setup();
    }

    public void setup(){
        handlingUser.addUser(1, "A", "123", "Cami", "432432");
        handlingUser.addUser(2, "B", "123", "dsadsa", "455666");
        handlingUser.addUser(3, "C", "123", "thgfhg", "777777");
        handlingUser.addUser(4, "D", "123", "hhhhhh", "888888");
        handlingUser.addUser(5, "E", "123", "mnbgjh", "999999");

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

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
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Gson gson = new Gson();

            BufferedReader reader = request.getReader();
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
                System.out.println(line);
            }

            String requestBody = sb.toString();

            String[] params = requestBody.split("&");
            String idStr = null, name = null, password = null, email = null, phone = null;

            for (String param : params) {
                String[] pair = param.split("=");
                if (pair.length == 2) {
                    String key = pair[0];
                    String value = pair[1];

                    switch (key) {
                        case "id":
                            idStr = value;
                            break;
                        case "name":
                            name = value;
                            break;
                        case "password":
                            password = value;
                            break;
                        case "email":
                            email = value;
                            break;
                        case "phone":
                            phone = value;
                            break;
                    }
                }
            }

            if (idStr == null || name == null || password == null || email == null || phone == null) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "All parameters are required.");
                return;
            }

            int id;
            try {
                id = Integer.parseInt(idStr);
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid id format.");
                return;
            }

            handlingUser.updateUser(id, name, password, email, phone);

            try (PrintWriter out = response.getWriter()) {
                out.println(gson.toJson(handlingUser.getUsers()));
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // Leer el parámetro 'id' desde el cuerpo de la solicitud
            BufferedReader reader = request.getReader();
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String requestBody = sb.toString();



            int id = Integer.parseInt(requestBody.split("=")[1]);

            boolean success = handlingUser.deleteUser(id);

            if (success) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().println("User deleted successfully.");
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "User not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
        }
    }



}