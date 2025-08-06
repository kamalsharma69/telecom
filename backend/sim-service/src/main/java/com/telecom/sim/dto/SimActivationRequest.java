package com.telecom.sim.dto;

import jakarta.validation.constraints.NotNull;

public class SimActivationRequest {
    @NotNull
    private Long userId;
    
    @NotNull
    private Long planId;
    
    private String planName;
    private String dataTotal;

    public SimActivationRequest() {}

    public SimActivationRequest(Long userId, Long planId, String planName, String dataTotal) {
        this.userId = userId;
        this.planId = planId;
        this.planName = planName;
        this.dataTotal = dataTotal;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }

    public String getPlanName() { return planName; }
    public void setPlanName(String planName) { this.planName = planName; }

    public String getDataTotal() { return dataTotal; }
    public void setDataTotal(String dataTotal) { this.dataTotal = dataTotal; }
}
