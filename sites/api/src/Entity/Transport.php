<?php

namespace App\Entity;

use App\Repository\TransportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TransportRepository::class)]
class Transport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $fromPlace = null;

    #[ORM\Column(length: 255)]
    private ?string $toPlace = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\ManyToOne(inversedBy: 'transports')]
    #[ORM\JoinColumn(nullable: false)]
    private ?AirPlane $airplane = null;

    #[ORM\OneToMany(mappedBy: 'transport', targetEntity: TransportItem::class)]
    private Collection $items;

    public function __construct()
    {
        $this->items = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFromPlace(): ?string
    {
        return $this->fromPlace;
    }

    public function setFromPlace(string $fromPlace): self
    {
        $this->fromPlace = $fromPlace;

        return $this;
    }

    public function getToPlace(): ?string
    {
        return $this->toPlace;
    }

    public function setToPlace(string $toPlace): self
    {
        $this->toPlace = $toPlace;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getAirplane(): ?AirPlane
    {
        return $this->airplane;
    }

    public function setAirplane(?AirPlane $airplane): self
    {
        $this->airplane = $airplane;

        return $this;
    }

    /**
     * @return Collection<int, TransportItem>
     */
    public function getItems(): Collection
    {
        return $this->items;
    }

    public function addItem(TransportItem $item): self
    {
        if (!$this->items->contains($item)) {
            $this->items->add($item);
            $item->setTransport($this);
        }

        return $this;
    }

    public function removeItem(TransportItem $item): self
    {
        if ($this->items->removeElement($item)) {
            // set the owning side to null (unless already changed)
            if ($item->getTransport() === $this) {
                $item->setTransport(null);
            }
        }

        return $this;
    }
}
