package com.telecom.sim.repository;

import com.telecom.sim.entity.SimRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SimRequestRepository extends JpaRepository<SimRequest, Long> {
    List<SimRequest> findByStatus(SimRequest.Status status);
    List<SimRequest> findByEmail(String email);
}
