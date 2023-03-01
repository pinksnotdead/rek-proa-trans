<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230227232955 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transport ADD airplane_id INT NOT NULL');
        $this->addSql('ALTER TABLE transport ADD CONSTRAINT FK_66AB212E996E853C FOREIGN KEY (airplane_id) REFERENCES air_plane (id)');
        $this->addSql('CREATE INDEX IDX_66AB212E996E853C ON transport (airplane_id)');
        $this->addSql('ALTER TABLE transport_item ADD transport_id INT NOT NULL');
        $this->addSql('ALTER TABLE transport_item ADD CONSTRAINT FK_C2CB729B9909C13F FOREIGN KEY (transport_id) REFERENCES transport (id)');
        $this->addSql('CREATE INDEX IDX_C2CB729B9909C13F ON transport_item (transport_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transport DROP FOREIGN KEY FK_66AB212E996E853C');
        $this->addSql('DROP INDEX IDX_66AB212E996E853C ON transport');
        $this->addSql('ALTER TABLE transport DROP airplane_id');
        $this->addSql('ALTER TABLE transport_item DROP FOREIGN KEY FK_C2CB729B9909C13F');
        $this->addSql('DROP INDEX IDX_C2CB729B9909C13F ON transport_item');
        $this->addSql('ALTER TABLE transport_item DROP transport_id');
    }
}
