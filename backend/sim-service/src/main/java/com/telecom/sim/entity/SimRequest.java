package com.telecom.sim.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sim_requests")
public class SimRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String email;
    private String phoneNumber;
    private Long planId;
    private String planName;
    
    @Enumerated(EnumType.STRING)
    private Status status;
    
    private LocalDateTime requestDate;
    private LocalDateTime processedDate;
    private String documents;

    public enum Status {
        PENDING, APPROVED, REJECTED
    }

    // Constructors
    public SimRequest() {
        this.requestDate = LocalDateTime.now();
        this.status = Status.PENDING;
    }

    public SimRequest(String customerName, String email, String phoneNumber, Long planId, String planName) {
        this();
        this.customerName = customerName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.planId = planId;
        this.planName = planName;
        this.documents = "ID Card, Address Proof";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }

    public String getPlanName() { return planName; }
    public void setPlanName(String planName) { this.planName = planName; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getRequestDate() { return requestDate; }
    public void setRequestDate(LocalDateTime requestDate) { this.requestDate = requestDate; }

    public LocalDateTime getProcessedDate() { return processedDate; }
    public void setProcessedDate(LocalDateTime processedDate) { this.processedDate = processedDate; }

    public String getDocuments() { return documents; }
    public void setDocuments(String documents) { this.documents = documents; }
}
