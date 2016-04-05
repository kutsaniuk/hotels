package hotels.business.workers.domain;

import hotels.business.hotels.domain.Hotel;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

/**
 * Created by kutsaniuk on 11.03.16.
 */

@Entity
@Table
public class Worker implements Serializable{

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @Column(name = "fullWorkerName")
    private String fullWorkerName;

    @Column(name = "post")
    private String post;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "age")
    private int age;

    @Column(name = "sex")
    private String sex;

    @Column(name = "experience")
    private int experience;

    @Column(name = "previousPost")
    private String previousPost;

    @Column(name = "dateOfEmployment")
    private Date dateOfEmployment;

    @ManyToOne
    @JoinColumn(name = "hotelsId", nullable = false)
    private Hotel hotel;

    public Worker() {

    }

    public Worker(String fullWorkerName, String post, Date birthday, int age, String sex, int experience, String previousPost, Date dateOfEmployment) {
        this.fullWorkerName = fullWorkerName;
        this.post = post;
        this.birthday = birthday;
        this.age = age;
        this.sex = sex;
        this.experience = experience;
        this.previousPost = previousPost;
        this.dateOfEmployment = dateOfEmployment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullWorkerName() {
        return fullWorkerName;
    }

    public void setFullWorkerName(String fullWorkerName) {
        this.fullWorkerName = fullWorkerName;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getPreviousPost() {
        return previousPost;
    }

    public void setPreviousPost(String previousPost) {
        this.previousPost = previousPost;
    }

    public Date getDateOfEmployment() {
        return dateOfEmployment;
    }

    public void setDateOfEmployment(Date dateOfEmployment) {
        this.dateOfEmployment = dateOfEmployment;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

}
