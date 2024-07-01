package gityeong.CashReceipt.service;

import gityeong.CashReceipt.entity.CashReceipt;
import gityeong.CashReceipt.repository.CashReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CashReceiptService {

    @Autowired
    private CashReceiptRepository cashReceiptRepository;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Value("${cashreceipt.topic.name}")
    private String topicName;

    public List<CashReceipt> getAllCashReceipts() {
        return cashReceiptRepository.findAll();
    }

    public Optional<CashReceipt> findById(Long id) {
        return cashReceiptRepository.findById(id);
    }

    @Transactional
    public CashReceipt createCashReceipt(CashReceipt cashReceipt) {
        CashReceipt savedCashReceipt = cashReceiptRepository.save(cashReceipt);
        kafkaProducerService.sendMessage(topicName, savedCashReceipt);
        return savedCashReceipt;
    }

    @Transactional
    public CashReceipt updateCashReceipt(Long id, CashReceipt cashReceipt) {
        if (cashReceiptRepository.existsById(id)) {
            cashReceipt.setId(id);
            CashReceipt updatedCashReceipt = cashReceiptRepository.save(cashReceipt);
            kafkaProducerService.sendMessage(topicName, updatedCashReceipt);
            return updatedCashReceipt;
        }
        return null; // or throw an exception
    }

    @Transactional
    public void deleteCashReceipt(Long id) {
        if (cashReceiptRepository.existsById(id)) {
            cashReceiptRepository.deleteById(id);
            CashReceipt deletedReceipt = new CashReceipt();
            deletedReceipt.setId(id);
            kafkaProducerService.sendMessage(topicName, deletedReceipt);
        }
    }
}
