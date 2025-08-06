package com.telecom.sim.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SimRequestDto {
    @NotBlank
    private String customerName;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    private String phoneNumber;
    
    @NotNull
    private Long planId;
    
    @NotBlank
    private String planName;

    public SimRequestDto() {}

    public SimRequestDto(String customerName, String email, String phoneNumber, Long planId, String planName) {
        this.customerName = customerName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.planId = planId;
        this.planName = planName;
    }

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
}
