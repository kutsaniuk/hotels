package hotels.business.hotels.domain;

import hotels.business.descriptions.domain.Description;
import hotels.business.workers.domain.Worker;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by kutsaniuk on 11.03.16.
 */

@Entity
@Table( name = "hotels" )
public class Hotel implements Serializable {

    @Id
    @Column( name = "id" )
    @GeneratedValue
    private Long id;

    @Column( name = "name" )
    private String name;

    @Column( name = "city" )
    private String city;

    @Column( name = "address" )
    private String address;

    @Column( name = "full_director_name" )
    private String fullDirectorName;

    @Column( name = "email" )
    private String email;

    @Column( name = "Director_phone_number" )
    private String directorPhoneNumber;

    @Column( name = "order_phone_number" )
    private String orderPhoneNumber;

    @OneToMany( targetEntity = Description.class, cascade = CascadeType.ALL, mappedBy = "hotel" )
    private Set<Description> descriptions = new HashSet<>();

    @OneToMany( targetEntity = Worker.class, cascade = CascadeType.ALL, mappedBy = "hotel" )
    private Set<Worker> workers = new HashSet<>();

    public Hotel() {
    }

    public Hotel( String name,
                  String city,
                  String address,
                  String fullDirectorName,
                  String email,
                  String directorPhoneNumber,
                  String orderPhoneNumber ) {
        this.name = name;
        this.city = city;
        this.address = address;
        this.fullDirectorName = fullDirectorName;
        this.email = email;
        this.directorPhoneNumber = directorPhoneNumber;
        this.orderPhoneNumber = orderPhoneNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId( Long id ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity( String city ) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress( String address ) {
        this.address = address;
    }

    public String getFullDirectorName() {
        return fullDirectorName;
    }

    public void setFullDirectorName( String fullDirectorName ) {
        this.fullDirectorName = fullDirectorName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail( String email ) {
        this.email = email;
    }

    public String getDirectorPhoneNumber() {
        return directorPhoneNumber;
    }

    public void setDirectorPhoneNumber( String directorPhoneNumber ) {
        this.directorPhoneNumber = directorPhoneNumber;
    }

    public String getOrderPhoneNumber() {
        return orderPhoneNumber;
    }

    public void setOrderPhoneNumber( String orderPhoneNumber ) {
        this.orderPhoneNumber = orderPhoneNumber;
    }

    public Set<Description> getDescriptions() {
        return descriptions;
    }

    public void setDescriptions( Set<Description> descriptions ) {
        this.descriptions = descriptions;
    }

    public Set<Worker> getWorkers() {
        return workers;
    }

    public void setWorkers( Set<Worker> workers ) {
        this.workers = workers;
    }

}
