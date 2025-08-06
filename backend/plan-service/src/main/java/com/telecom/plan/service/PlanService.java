package com.telecom.plan.service;

import com.telecom.plan.entity.Plan;
import com.telecom.plan.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    public List<Plan> getAllActivePlans() {
        return planRepository.findByIsActiveTrue();
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public Plan getPlanById(Long id) {
        return planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));
    }

    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    public Plan updatePlan(Long id, Plan planDetails) {
        Plan plan = getPlanById(id);
        
        plan.setName(planDetails.getName());
        plan.setPrice(planDetails.getPrice());
        plan.setData(planDetails.getData());
        plan.setCalls(planDetails.getCalls());
        plan.setSms(planDetails.getSms());
        plan.setValidity(planDetails.getValidity());
        plan.setDescription(planDetails.getDescription());
        plan.setActive(planDetails.isActive());

        return planRepository.save(plan);
    }

    public void deletePlan(Long id) {
        Plan plan = getPlanById(id);
        plan.setActive(false); // Soft delete
        planRepository.save(plan);
    }
}
