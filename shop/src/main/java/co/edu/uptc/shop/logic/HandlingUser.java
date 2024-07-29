package co.edu.uptc.shop.logic;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class HandlingUser {
    List<User> users;

    public HandlingUser() {
        users = new ArrayList<>();
    }

    public List<User> getUsers() {
        return users;
    }

    public User findUser(int id){
        Optional<User> user = users.stream().filter(u -> u.getId() == id).findFirst();
        return user.orElse(null);
    }
    public boolean addUser(int id, String name, String password, String email, String phone) {
        if(findUser(id) == null){
            User user = new User(id, name, password, email, phone);
            users.add(user);
            return true;
        }
        return false;
    }

    public boolean updateUser(int id, String name, String password, String email, String phone) {
        User u = findUser(id);
        if(u != null){
            u.setName(name);
            u.setPassword(password);
            u.setEmail(email);
            u.setPhone(phone);
            return true;
        }
        return false;
    }

    public boolean deleteUser(int id){
        User u = findUser(id);
        if(u != null){
            users.remove(u);
            return true;
        }
        return false;
    }
}
