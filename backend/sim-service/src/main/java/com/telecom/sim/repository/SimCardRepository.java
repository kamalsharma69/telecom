package com.telecom.sim.repository;

import com.telecom.sim.entity.SimCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SimCardRepository extends JpaRepository<SimCard, Long> {
    List<SimCard> findByUserId(Long userId);
    List<SimCard> findByStatus(SimCard.Status status);
}
